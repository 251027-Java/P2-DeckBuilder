package org.example.Controller;

import java.time.LocalDateTime;

public record DeckDTO(
    Integer deckId, 
    Integer userId,
    String name, 
    String description, 
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}

