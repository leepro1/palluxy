package com.palluxy.domain.pet.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.io.IOException;
import java.util.List;

@Converter(autoApply = true)
public class JsonNodeConverter implements AttributeConverter<List<Personality>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Personality> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert JSON attribute to String", e);
        }
    }

    @Override
    public List<Personality> convertToEntityAttribute(String dbData) {
        try {
            CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(List.class, Personality.class);
            return objectMapper.readValue(dbData, listType);
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert String to JSON attribute", e);
        }
    }
}
