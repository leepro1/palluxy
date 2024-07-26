package com.palluxy.domain.memoryRoom.petmeta.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.entity.PetMeta;
import com.palluxy.domain.memoryRoom.petmeta.repository.PetMetaRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetMetaServiceImpl implements PetMetaService {

  @Autowired
  private PetMetaRepository petMetaRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private AmazonS3 amazonS3;

  private final WebClient webClient;

  private final String bucketName = "palluxytest-resdstone";

  public PetMetaServiceImpl(WebClient.Builder webClientBuilder) {
    this.webClient = webClientBuilder.baseUrl("http://127.0.0.1:8000").build();
  }

  @Override
  public PetMetaDto createPetMeta(PetMetaDto petMetaDto, Long roomId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));

    PetMeta petMeta = new PetMeta();
    petMeta.setObjFilePath(petMetaDto.getObjFilePath());
    petMeta.setPositionX(0.0);
    petMeta.setPositionY(0.0);
    petMeta.setPositionZ(0.0);
    petMeta.setRotationX(0.0);
    petMeta.setRotationY(0.0);
    petMeta.setRotationZ(0.0);
    petMeta.setRoom(room);

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public PetMetaDto getPetMetaById(Long petMetaId) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));
    return new PetMetaDto(petMeta);
  }

  @Override
  public List<PetMetaDto> getPetMetaByRoomId(Long roomId) {
    List<PetMeta> petMetas = petMetaRepository.findByRoom_RoomId(roomId);
    return petMetas.stream().map(PetMetaDto::new).collect(Collectors.toList());
  }

  @Override
  public PetMetaDto updatePetMeta(Long petMetaId, PetMetaDto petMetaDto) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));

    petMeta.setObjFilePath(petMetaDto.getObjFilePath());
    petMeta.setPositionX(petMetaDto.getPositionX());
    petMeta.setPositionY(petMetaDto.getPositionY());
    petMeta.setPositionZ(petMetaDto.getPositionZ());
    petMeta.setRotationX(petMetaDto.getRotationX());
    petMeta.setRotationY(petMetaDto.getRotationY());
    petMeta.setRotationZ(petMetaDto.getRotationZ());

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public PetMetaDto updatePetMetaPositionRotation(Long petMetaId, double positionX, double positionY, double positionZ, double rotationX, double rotationY, double rotationZ) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));

    petMeta.setPositionX(positionX);
    petMeta.setPositionY(positionY);
    petMeta.setPositionZ(positionZ);
    petMeta.setRotationX(rotationX);
    petMeta.setRotationY(rotationY);
    petMeta.setRotationZ(rotationZ);

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public void deletePetMeta(Long petMetaId) {
    petMetaRepository.deleteById(petMetaId);
  }

  @Override
  public Mono<String> uploadImageToDjangoAndProcess(Long roomId, MultipartFile file) {
    return Mono.defer(() -> {
      MultipartBodyBuilder builder = new MultipartBodyBuilder();
      builder.part("file", file.getResource());
      builder.part("roomId", roomId);

      return webClient.post()
          .uri("/api/v1/run-model/")
          .contentType(MediaType.MULTIPART_FORM_DATA)
          .body(BodyInserters.fromMultipartData(builder.build()))
          .retrieve()
          .bodyToMono(String.class);
    });
  }

  @Override
  public Mono<String> processWebhook(Long roomId, FilePart filePart) {
    return handleObjFileUpload(roomId, filePart);
  }

  @Override
  public Mono<String> handleObjFileUpload(Long roomId, FilePart filePart) {
    return filePart.content()
        .reduce(DataBuffer::write)
        .map(dataBuffer -> {
          File file = new File(System.getProperty("java.io.tmpdir") + "/" + filePart.filename());
          try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(dataBuffer.asByteBuffer().array());
          } catch (IOException e) {
            throw new RuntimeException("Error writing file", e);
          }
          return file;
        })
        .flatMap(this::uploadToS3);
  }

  private Mono<String> uploadToS3(File file) {
    String s3Key = "uploaded/" + file.getName();
    return Mono.fromCallable(() -> {
      amazonS3.putObject(new PutObjectRequest(bucketName, s3Key, file)
          .withCannedAcl(CannedAccessControlList.PublicRead));
      return amazonS3.getUrl(bucketName, s3Key).toString();
    });
  }
}
