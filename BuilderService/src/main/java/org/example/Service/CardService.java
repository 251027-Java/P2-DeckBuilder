package org.example.Service;

import org.example.Controller.CardDTO;
import org.example.Controller.SetDTO;
import org.example.Repository.ICardRepository;
import org.example.Repository.ISetRepository;
import org.example.model.Card;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {
    private final ICardRepository repository;
    private final ISetRepository setRepo;

    public CardService(ICardRepository cardRepo, ISetRepository setRepo) {
        this.repository = cardRepo;
        this.setRepo = setRepo;
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
    private CardDTO CardToDTO(Card card){
      return new CardDTO(card.getId(), card.getName(), card.getRarity(), card.getCardType(), card.getSetId());
    }
}
