package com.palluxy.domain.memoryRoom.album.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

  private final Path rootLocation = Paths.get("uploads");

  public FileStorageService() {
    try {
      Files.createDirectories(rootLocation);
    } catch (IOException e) {
      throw new RuntimeException("Could not create upload directory!");
    }
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
