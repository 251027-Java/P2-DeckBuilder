package org.example.Controller;

import java.time.LocalDateTime;

public record DeckDTO(Integer id, String name, String description, LocalDateTime createdAt) {}

