package com.palluxy.global.config;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {

    @Autowired
    private AmazonS3 amazonS3;

    private final String bucketName = "palluxytest-resdstone"; // S3 버킷 이름

    // S3에 파일 업로드
    public String storeFile(MultipartFile file, String folderName) throws IOException {
        String fileName = folderName + "/" + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType()); // Content-Type 설정
            metadata.setContentDisposition("inline"); // Content-Disposition 설정

            amazonS3.putObject(bucketName, fileName, file.getInputStream(), metadata);
            return fileName;
        } catch (Exception e) {
            throw new IOException("Failed to upload file to S3", e);
        }
    }

    // S3에서 파일 삭제
    public void deleteFileFromS3(String fileName) {
        amazonS3.deleteObject(bucketName, fileName);
    }

    // S3에서 파일 다운로드
    public S3ObjectInputStream downloadFileFromS3(String fileName) {
        S3Object s3Object = amazonS3.getObject(bucketName, fileName);
        return s3Object.getObjectContent();
    }

    // S3 파일 URL 가져오기
    public String getFileUrl(String fileName) {
        return amazonS3.getUrl(bucketName, fileName).toString();
    }
}
