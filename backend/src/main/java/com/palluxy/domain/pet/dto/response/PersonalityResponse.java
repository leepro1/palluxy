package com.palluxy.domain.pet.dto.response;

import com.palluxy.domain.pet.entity.Personality;
import lombok.Builder;

@Builder
public record PersonalityResponse(

    int id,
    String type

) {

    public static PersonalityResponse of(Personality data) {
        return PersonalityResponse.builder()
            .id(data.getId())
            .type(data.getType())
            .build();
    }
}
