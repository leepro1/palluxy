package com.palluxy.domain.memoryRoom.petmeta.service;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/petMeta/files")
public class ObjUploadController {

  private final WebClient webClient;

  public ObjUploadController(WebClient.Builder webClientBuilder) {
    this.webClient = webClientBuilder.baseUrl("http://django-server-endpoint").build();
  }

  @PostMapping("/upload")
  public Mono<ResponseEntity<String>> uploadFile(@RequestPart("file") MultipartFile file) {
    return webClient
        .post()
        .uri("/upload/")
        .contentType(MediaType.MULTIPART_FORM_DATA)
        .bodyValue(file)
        .retrieve()
        .bodyToMono(String.class)
        .map(response -> ResponseEntity.ok().body(response));
  }

  @GetMapping("/download/{filename}")
  public Mono<ResponseEntity<Flux<DataBuffer>>> downloadFile(@PathVariable String filename) {
    return webClient
        .get()
        .uri("/download/" + filename)
        .accept(MediaType.APPLICATION_OCTET_STREAM)
        .retrieve()
        .bodyToFlux(DataBuffer.class)
        .collectList()
        .map(
            dataBuffers ->
                ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(Flux.fromIterable(dataBuffers)));
  }
}
