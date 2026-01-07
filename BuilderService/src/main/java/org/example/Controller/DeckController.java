package org.example.Controller;

import java.util.List;

import org.example.Service.DeckService;
import org.example.model.Deck;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deck")
public class DeckController {
    private final DeckService service;

    public DeckController(DeckService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DeckDTO> createDeck(
            @RequestParam String name,
            @RequestParam(required = false) String description) {
        try {
            Deck deck = service.createDeck(name, description);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(deckToDTO(deck));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<DeckDTO> getAllDecks() {
        return service.listDecks().stream()
                .map(this::deckToDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeckDTO> getDeckById(@PathVariable int id) {
        try {
            Deck deck = service.getDeckById(id);
            return ResponseEntity.ok(deckToDTO(deck));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeck(@PathVariable int id) {
        try {
            boolean deleted = service.deleteDeck(id);
            return deleted ? ResponseEntity.noContent().build() 
                          : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private DeckDTO deckToDTO(Deck deck) {
        return new DeckDTO(
                deck.getId(),
                null, // userId - TODO: Add user support
                deck.getName(),
                deck.getDescription(),
                deck.getCreatedAt(),
                deck.getCreatedAt() // updatedAt - using createdAt for now
        );
    }
}

