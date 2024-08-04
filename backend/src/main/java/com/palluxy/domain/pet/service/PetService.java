package com.palluxy.domain.pet.service;

import com.palluxy.domain.pet.dto.request.PetRegisterRequest;
import com.palluxy.domain.pet.dto.response.PersonalityResponse;
import com.palluxy.domain.pet.dto.response.PetIdResponse;
import com.palluxy.domain.pet.dto.response.PetResponse;
import com.palluxy.domain.pet.entity.Personality;
import com.palluxy.domain.pet.entity.Pet;
import com.palluxy.domain.pet.exception.PetNotFoundException;
import com.palluxy.domain.pet.repository.PersonalityRepository;
import com.palluxy.domain.pet.repository.PetRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PetService {

    private final PetRepository petRepository;
    private final PersonalityRepository personalityRepository;

    public List<PersonalityResponse> getAllPersonalities() {
        List<Personality> data = personalityRepository.findAll();

        return data.stream()
            .map(PersonalityResponse::of)
            .toList();
    }

    @Transactional
    public void registerPet(PetRegisterRequest request) {
        List<Personality> personalities = request.personalities().stream()
            .map(p -> new Personality(p.id(), p.type()))
            .toList();

        if (personalities.size() > 3) {
            throw new IllegalArgumentException("성격은 최대 3개까지 선택할 수 있습니다.");
        }

        Pet pet = Pet.builder()
            .userId(request.userId())
            .name(request.name())
            .species(request.species())
            .relation(request.relation())
            .personalities(personalities)
            .firstAt(request.firstAt())
            .lastAt(request.lastAt())
            .build();

        petRepository.save(pet);
    }

    @Transactional
    public Pet updatePet(Long petId, PetRegisterRequest request) {
        Pet pet = petRepository.findById(petId).orElseThrow(PetNotFoundException::new);

        List<Personality> personalities = request.personalities().stream()
            .map(p -> new Personality(p.id(), p.type()))
            .toList();

        pet.updateInfo(request, personalities);

        return petRepository.save(pet);
    }

    public PetResponse findById(Long id) {
        return petRepository.findById(id)
            .map(PetResponse::of)
            .orElseThrow(PetNotFoundException::new);
    }

    public PetIdResponse findByUserId(Long userid) {
        return petRepository.findByUserId(userid)
            .map(PetIdResponse::of)
            .orElseThrow(PetNotFoundException::new);
    }

    @Transactional
    public void deletePet(Long petId) {
        Pet pet = petRepository.findById(petId).orElseThrow(PetNotFoundException::new);
        petRepository.delete(pet);
    }
}
