package com.palluxy.domain.memoryRoom.album.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {
  // 임시파일 위치와, 최종파일 저장 위치
  // 이미지를 올릴때, 올리자마자 저장되는것이 아니라 임시로 형태를 보여주고
  // 저장버튼을 누를때 실제로 저장되게 만드는것
  private final Path rootLocation = Paths.get("uploads");
  private final Path tempLocation = Paths.get("tempUploads");

  public FileStorageService() {
    try {
      Files.createDirectories(rootLocation);
      Files.createDirectories(tempLocation);
    } catch (IOException e) {
      throw new RuntimeException("Could not create upload directory!");
    }
  }

  public String storeTempFile(MultipartFile file) throws IOException {
    String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    Path destinationFile = this.tempLocation.resolve(Paths.get(fileName)).normalize().toAbsolutePath();

    if (!destinationFile.getParent().equals(this.tempLocation.toAbsolutePath())) {
      throw new IOException("Cannot store file outside current directory.");
    }

    try (var inputStream = file.getInputStream()) {
      Files.copy(inputStream, destinationFile);
    }
    return destinationFile.toString();
  }

  public String storeFileFromTemp(String tempFilePath) throws IOException {
    Path tempFile = Paths.get(tempFilePath);
    Path destinationFile = this.rootLocation.resolve(tempFile.getFileName()).normalize().toAbsolutePath();

    Files.move(tempFile, destinationFile);
    return destinationFile.toString();
  }

  public void deleteTempFile(String tempFilePath) throws IOException {
    Files.deleteIfExists(Paths.get(tempFilePath));
  }

  //실제 최종 저장소에 저장하는 메서드
  public String storeFile(MultipartFile file) throws IOException {
    Path destinationFile = this.rootLocation.resolve(
            Paths.get(file.getOriginalFilename()))
        .normalize().toAbsolutePath();

    if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
      throw new IOException("Cannot store file outside current directory.");
    }

    try (var inputStream = file.getInputStream()) {
      Files.copy(inputStream, destinationFile);
    }
    return destinationFile.toString();
  }
}
