import os
import subprocess
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .serializers import FileUploadSerializer


class RunModelAPIView(APIView):
    def post(self, request):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['file']
            roomId = serializer.validated_data['roomId']
        else:
            return Response({"message": "request false",}, status=status.HTTP_400_BAD_REQUEST)

        image = request.FILES.get('file')
        

        if not image:
            return Response({"error": "Image file is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        local_image_path = f'./tmp/{image.name}'
        with open(local_image_path, 'wb') as f:
            for chunk in image.chunks():
                f.write(chunk)

        output_dir = f'./tmp/output/{image.name}'
        os.makedirs(output_dir, exist_ok=True)

        # AI 모델 실행
        command = f"python run.py {local_image_path} --output-dir {output_dir}"
        try:
            result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        except subprocess.CalledProcessError as e:
            return Response({"error": e.stderr}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # 결과 파일 경로
        output_file = os.path.join(output_dir, '0/mesh.obj')
        if not os.path.exists(output_file):
            return Response({"error": "Output file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # 스프링 서버로 obj 파일 전송
        spring_server_url = f'{settings.SPRING_SERVER_URL}/api/rooms/{roomId}/petmeta/webhook' # 스프링 서버 URL은 settings.py에 정의
        try:
            with open(output_file, 'rb') as f:
                files = {'file': (f'{image.name}.obj', f, 'application/octet-stream')}
                response = requests.post(spring_server_url, files=files)
                if response.status_code != 200:
                    return Response({"error": "Failed to upload obj file to Spring server"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # # 이미지 파일과 obj 파일 삭제
        # try:
        #     os.remove(local_image_path)
        #     os.remove(output_file)
        #     os.rmdir(output_dir)  # output 디렉토리가 비어 있지 않다면, 비워진 후에 삭제
        # except Exception as e:
        #     return Response({"error": f"Failed to delete files: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "File processed, uploaded, and deleted successfully",}, status=status.HTTP_200_OK)
        # return Response({"message": "File processed, uploaded, and deleted successfully", "result": result.stdout}, status=status.HTTP_200_OK)
    
    