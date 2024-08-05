package com.palluxy.domain.pet.service;

import com.palluxy.domain.pet.dto.request.PetRegisterRequest;
import com.palluxy.domain.pet.dto.response.PersonalityResponse;
import com.palluxy.domain.pet.dto.response.PetIdResponse;
import com.palluxy.domain.pet.dto.response.PetResponse;
import com.palluxy.domain.pet.entity.Pet;

import java.util.List;

public interface PetService {

    List<PersonalityResponse> getAllPersonalities();

    void registerPet(PetRegisterRequest request);

    Pet updatePet(Long petId, PetRegisterRequest request);

    PetResponse findById(Long id);

    PetIdResponse findByUserId(Long userId);

    void deletePet(Long petId);
}
