package com.palluxy.domain.pet.dto.response;

import com.palluxy.domain.pet.entity.Pet;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record PetResponse(

    Long id,
    String name,
    String species,
    String relation,
    List<PersonalityResponse> personalities,
    LocalDate firstAt,
    LocalDate lastAt

) {

    public static PetResponse of(Pet data) {
        return PetResponse.builder()
            .id(data.getId())
            .name(data.getName())
            .relation(data.getRelation())
            .species(data.getSpecies())
            .personalities(data.getPersonalities().stream()
                .map(personality -> PersonalityResponse.builder().id(personality.getId())
                    .type(personality.getType()).build())
                .toList())
            .firstAt(data.getFirstAt())
            .lastAt(data.getLastAt())
            .build();
    }
}
