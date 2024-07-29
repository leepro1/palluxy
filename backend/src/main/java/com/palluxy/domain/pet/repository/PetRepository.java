package com.palluxy.domain.pet.repository;

import com.palluxy.domain.pet.entity.Pet;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    Optional<Pet> findByUserId(Long userid);
}
