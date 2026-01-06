package org.example.Controller;

import org.example.Service.DeckService;
import org.example.model.Deck;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                deck.getName(),
                deck.getDescription(),
                deck.getCreatedAt()
        );
    }
}

