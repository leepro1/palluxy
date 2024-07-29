package com.palluxy.domain.pet.dto.response;

import com.palluxy.domain.pet.entity.Pet;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record PetIdResponse(

    Long userId,
    Long petId

) {

    public static PetIdResponse of(Pet data) {
        return PetIdResponse.builder()
            .userId(data.getUserId())
            .petId(data.getId())
            .build();
    }
}
