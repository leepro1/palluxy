import os
import subprocess
import requests
import boto3
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .serializers import FileUploadSerializer


class RunModelAPIView(APIView):
    def post(self, request):
        # 스프링 서버에서 받은 이미지를 저장할 경로 설정
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['file']
            roomId = serializer.validated_data['roomId']
        else:
            return Response({"message": "request false",}, status=status.HTTP_400_BAD_REQUEST)

        image = request.FILES.get('file')
        
        if not image:
            return Response({"error": "Image file is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        print(image)
        print(image.name)
        local_image_path = f'./tmp/{image.name}'
        with open(local_image_path, 'wb') as f:
            for chunk in image.chunks():
                f.write(chunk)

        output_dir = f'./tmp/output/{image.name}'
        os.makedirs(output_dir, exist_ok=True)

        python_path = "/home/redstone0618/anaconda3/envs/python_3/bin/python"

        # AI 모델 실행
        # command = f"python run.py {local_image_path} --output-dir {output_dir}"
        command = f"{python_path} run.py {local_image_path} --output-dir {output_dir}"
        try:
            result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        except subprocess.CalledProcessError as e:
            return Response({"error": e.stderr}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # 결과 파일 경로
        output_file = os.path.join(output_dir, '0/mesh.obj')
        if not os.path.exists(output_file):
            return Response({"error": "Output file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        # S3설정
        s3 = boto3.client('s3',
                        aws_access_key_id = settings.AWS_ACCESS_KEY_ID,
                        aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY,
                        region_name = settings.AWS_S3_REGION_NAME,
                        )
        
        object_name = 'palmodel/'
        s3.put_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=object_name)
        # S3로 obj업로드
        try:
            s3.upload_file(output_file, settings.AWS_STORAGE_BUCKET_NAME, f'palmodel/{roomId}/{image.name}.obj', ExtraArgs={'ContentType': 'application/octet-stream', 'ContentDisposition': 'inline'})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        payload = {
            'file':f'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/{roomId}/https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/2/sleepcat.jpg.obj',
            "roomId": roomId
        }

        # 이미지 파일과 obj 파일 삭제
        try:
            os.remove(local_image_path)
            os.remove(output_file)
            os.remove(os.path.join(output_dir, '0/input.png'))
            os.rmdir(os.path.join(output_dir, '0/'))  # output 디렉토리가 비어 있지 않다면, 비워진 후에 삭제
            os.rmdir(output_dir)  # output 디렉토리가 비어 있지 않다면, 비워진 후에 삭제
        except Exception as e:
            return Response({"error": f"Failed to delete files: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"message": "File processed, uploaded, and deleted successfully", "result": payload}, status=status.HTTP_200_OK)