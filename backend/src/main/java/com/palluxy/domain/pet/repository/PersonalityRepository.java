package com.palluxy.domain.pet.repository;

import com.palluxy.domain.pet.entity.Personality;
import com.palluxy.domain.pet.entity.Pet;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalityRepository extends JpaRepository<Personality, Integer> {

    List<Personality> findByTypeIn(List<String> types);
}
