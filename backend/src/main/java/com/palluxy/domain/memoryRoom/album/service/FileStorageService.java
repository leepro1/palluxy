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
