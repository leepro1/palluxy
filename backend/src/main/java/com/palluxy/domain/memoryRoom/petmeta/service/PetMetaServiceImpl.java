package com.palluxy.domain.memoryRoom.petmeta.service;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.dto.WebhookResponse;
import com.palluxy.domain.memoryRoom.petmeta.entity.PetMeta;
import com.palluxy.domain.memoryRoom.petmeta.repository.PetMetaRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetMetaServiceImpl implements PetMetaService {

  private static final Logger logger = LoggerFactory.getLogger(PetMetaServiceImpl.class);

  @Autowired
  private PetMetaRepository petMetaRepository;

  @Autowired
  private RoomRepository roomRepository;

  private final WebClient webClient;

  public PetMetaServiceImpl(WebClient.Builder webClientBuilder) {
    this.webClient = webClientBuilder.baseUrl("http://35.241.111.176/").build();
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
  public PetMetaDto updatePetMetaPosition(Long petMetaId, double positionX, double positionY, double positionZ) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));

    petMeta.setPositionX(positionX);
    petMeta.setPositionY(positionY);
    petMeta.setPositionZ(positionZ);

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public PetMetaDto updatePetMetaRotation(Long petMetaId, double rotationX, double rotationY, double rotationZ) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));

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
  public Mono<WebhookResponse.WebhookResult> uploadImageToDjangoAndProcess(Long roomId, MultipartFile file) {
    return Mono.defer(() -> {
      MultipartBodyBuilder builder = new MultipartBodyBuilder();
      builder.part("file", file.getResource());
      builder.part("roomId", roomId);

      // 파일 정보 로그 출력
      logger.info("Received file: name={}, originalFilename={}, contentType={}, size={}",
          file.getName(), file.getOriginalFilename(), file.getContentType(), file.getSize());

      return webClient.post()
          .uri("/api/v1/run-model/")
          .contentType(MediaType.MULTIPART_FORM_DATA)
          .body(BodyInserters.fromMultipartData(builder.build()))
          .retrieve()
          .bodyToMono(WebhookResponse.class)
          .map(WebhookResponse::getResult);
    });
  }
}
