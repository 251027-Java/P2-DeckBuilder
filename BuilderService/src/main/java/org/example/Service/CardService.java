package org.example.Service;

import java.util.List;
import java.util.Optional;

import org.example.Controller.CardDTO;
import org.example.Repository.ICardRepository;
import org.example.Repository.ISetRepository;
import org.example.api.PokemonTcgApiClient;
import org.example.model.Card;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private final ICardRepository repository;
    private final ISetRepository setRepo;
    private final PokemonTcgApiClient apiClient;

    public CardService(ICardRepository cardRepo, ISetRepository setRepo, PokemonTcgApiClient apiClient) {
        this.repository = cardRepo;
        this.setRepo = setRepo;
        this.apiClient = apiClient;
    }

    public CardDTO getById(String id) {
            Optional<Card> card = repository.findById(id);
            return card.isEmpty() ? null : CardToDTO(card.get());
    }

    public List<CardDTO> getBySetId(String setId) {
        List<Card> cards = repository.findBySetId(setId);
        return cards.stream().map(this::CardToDTO).toList();
    }

    public List<CardDTO> getAllCards() {
        return repository.findAll().stream().map(this::CardToDTO).toList();
    }

    /**
     * Search for cards by name with sync logic:
     * 1. Check database first
     * 2. If no results, fetch from Pokemon TCG API
     * 3. Persist new cards to database
     * 4. Return results
     */
    public List<CardDTO> searchCardsByName(String name) {
        // Step 1: Check database for matches
        List<Card> dbCards = repository.findByNameContainingIgnoreCase(name);
        
        if (!dbCards.isEmpty()) {
            // Found in database, return immediately
            return dbCards.stream().map(this::CardToDTO).toList();
        }
        
        // Step 2: No results in DB, fetch from Pokemon TCG API
        List<Card> apiCards = apiClient.fetchCardsByName(name);
        
        if (apiCards.isEmpty()) {
            // No results from API either
            return List.of();
        }
        
        // Step 3: Persist response to database
        List<Card> savedCards = repository.saveAll(apiCards);
        
        // Step 4: Return results
        return savedCards.stream().map(this::CardToDTO).toList();
    }

    private CardDTO CardToDTO(Card card){
      return new CardDTO(card.getId(), card.getName(), card.getRarity(), card.getCardType(), card.getSetId());
    }
}
