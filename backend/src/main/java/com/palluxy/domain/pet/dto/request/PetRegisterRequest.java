package com.palluxy.domain.pet.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public record PetRegisterRequest(

    @NotBlank
    String name,

    @NotBlank
    String species,

    @NotBlank
    String relation,

    @NotEmpty
    @Size(min = 1, max = 3, message = "성격은 최소 1개 최대 3개를 입력해 주세요")
    List<PersonalityRequest> personalities,

    @NotNull
    @PastOrPresent
    LocalDate firstAt,

    @PastOrPresent
    LocalDate lastAt
) {

}
