package org.example.Service;

import org.example.Repository.IDeckRepository;
import org.example.model.Deck;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeckService {
    private final IDeckRepository deckRepo;

    public DeckService(IDeckRepository deckRepo) {
        this.deckRepo = deckRepo;
    }

    public Deck createDeck(String name, String description) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Deck name cannot be empty.");
        }
        // Trim name before checking for duplicates
        String trimmedName = name.trim();
        String trimmedDescription = description == null ? null : description.trim();

        Deck existing = deckRepo.findByName(trimmedName);
        if (existing != null) {
            throw new IllegalArgumentException("A deck with that name already exists.");
        }

        Deck deck = new Deck(trimmedName, trimmedDescription);
        return deckRepo.save(deck);
    }

    public List<Deck> listDecks() {
        return deckRepo.findAll();
    }

    public Deck getDeckById(int id) {
        if (id <= 0) throw new IllegalArgumentException("Deck id must be positive.");
        Deck d = deckRepo.findById(id);
        if (d == null) {
            throw new IllegalArgumentException("No deck found with id: " + id);
        }
        return d;
    }

    public boolean deleteDeck(int id) {
        getDeckById(id);
        return deckRepo.deleteById(id);
    }
}
