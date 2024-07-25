import boto3
import os
import subprocess
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, ClientError


class RunModelAPIView(APIView):
    def post(self, request):
        image_s3_path = request.data.get('image_path')
        if not image_s3_path:
            return Response({"error": "Image path params required"}, status=status.HTTP_400_BAD_REQUEST)

        # S3설정
        s3 = boto3.client('s3',
                        aws_access_key_id = settings.AWS_ACCESS_KEY_ID,
                        aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY,
                        region_name = settings.AWS_S3_REGION_NAME,
                        )
        # local_image_path = os.path.join('/tmp/', os.path.basename(image_s3_path))
        local_image_path = f'./tmp/{image_s3_path}'

        print('download image from s3')
        # S3에서 이미지 다운로드
        try:
            s3.download_file(settings.AWS_STORAGE_BUCKET_NAME, image_s3_path, local_image_path)
        except NoCredentialsError:
            return Response({"error": "Unable to locate credentials"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except PartialCredentialsError:
            return Response({"error": "Incomplete credentials provided"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except ClientError as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        output_dir = f'./tmp/output/{image_s3_path}'
        os.makedirs(output_dir, exist_ok=True)

        print('run model')
        # AI 모델 실행을 별도의 프로세스로 실행
        command = f"python run.py {local_image_path} --output-dir {output_dir}"
        try:
            result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        except subprocess.CalledProcessError as e:
            return Response({"error": e.stderr}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # 결과 파일 경로
        print(output_dir)
        output_file = os.path.join(output_dir, '0/mesh.obj')
        print(output_file)
        if not os.path.exists(output_file):
            return Response({"error": "Output file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        print('upload image to s3')
        # S3에 파일 업로드
        try:
            s3.upload_file(output_file, settings.AWS_STORAGE_BUCKET_NAME, f'{image_s3_path}.obj')
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "File uploaded successfully", "result": result.stdout}, status=status.HTTP_200_OK)