package com.palluxy.domain.memoryRoom.petmeta.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ObjStorageService {

  private final Path rootLocation = Paths.get("uploads");

  public ObjStorageService() {
    try {
      Files.createDirectories(rootLocation);
    } catch (IOException e) {
      throw new RuntimeException("Could not create upload directory!");
    }
  }

  public String storeFile(MultipartFile file) throws IOException {
    String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    Path destinationFile = this.rootLocation.resolve(Paths.get(fileName)).normalize().toAbsolutePath();

    if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
      throw new IOException("Cannot store file outside current directory.");
    }

    try (var inputStream = file.getInputStream()) {
      Files.copy(inputStream, destinationFile);
    }
    return destinationFile.toString();
  }

  public void deleteFile(String filePath) throws IOException {
    Files.deleteIfExists(Paths.get(filePath));
  }
}
