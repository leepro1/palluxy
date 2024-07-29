package com.palluxy.domain.pet.entity;

import com.palluxy.domain.pet.dto.request.PetRegisterRequest;
import com.palluxy.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "pet")
public class Pet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String species;

    @Column(length = 25)
    private String relation;

    @Column(columnDefinition = "json")
    @Convert(converter = JsonNodeConverter.class)
    private List<Personality> personalities;

    private LocalDate firstAt;

    private LocalDate lastAt;

    private Long userId;

    @Builder
    public Pet(String name, String species, String relation, List<Personality> personalities,
        LocalDate firstAt, LocalDate lastAt, Long userId) {
        this.name = name;
        this.species = species;
        this.relation = relation;
        this.personalities = personalities;
        this.firstAt = firstAt;
        this.lastAt = lastAt;
        this.userId = userId;
    }

    public void updateInfo(PetRegisterRequest request, List<Personality> personalities) {
        this.name = request.name();
        this.species = request.species();
        this.relation = request.relation();
        this.personalities = personalities;
        this.firstAt = request.firstAt();
        this.lastAt = request.lastAt();
    }
}
