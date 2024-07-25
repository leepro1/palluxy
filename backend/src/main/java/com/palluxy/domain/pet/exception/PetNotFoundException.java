package com.palluxy.domain.pet.exception;

public class PetNotFoundException extends RuntimeException {

    public PetNotFoundException() {
        super("해당 반려동물이 존재하지 않습니다.");
    }

}
