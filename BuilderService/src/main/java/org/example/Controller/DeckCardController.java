package org.example.Controller;

import org.example.Service.DeckCardService;
import org.example.model.DeckCardView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deck-card")
public class DeckCardController {
    private final DeckCardService service;

    public DeckCardController(DeckCardService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> addCardToDeck(
            @RequestParam int deckId,
            @RequestParam String cardId,
            @RequestParam int quantity) {
        try {
            service.addCardToDeck(deckId, cardId, quantity);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> removeCardFromDeck(
            @RequestParam int deckId,
            @RequestParam String cardId) {
        try {
            boolean removed = service.removeCardFromDeck(deckId, cardId);
            return removed ? ResponseEntity.noContent().build() 
                          : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/deck/{deckId}")
    public ResponseEntity<List<DeckCardView>> viewDeckContents(@PathVariable int deckId) {
        try {
            List<DeckCardView> contents = service.viewDeckContents(deckId);
            return ResponseEntity.ok(contents);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

