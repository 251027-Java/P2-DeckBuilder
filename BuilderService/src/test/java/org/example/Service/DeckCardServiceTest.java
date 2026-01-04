package org.example.Service;

import org.example.Repository.ICardRepository;
import org.example.Repository.IDeckCardRepository;
import org.example.Repository.IDeckRepository;
import org.example.model.Card;
import org.example.model.Deck;
import org.example.model.DeckCardView;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeckCardServiceTest {

    @Mock
    IDeckCardRepository deckCardRepo;

    @Mock
    IDeckRepository deckRepo;

    @Mock
    ICardRepository cardRepo;

    @InjectMocks
    DeckCardService deckCardService;

    @Test
    void addCardToDeck_happyPath_callsRepo() {
        Deck d = new Deck();
        d.setId(1);
        d.setName("Demo Deck");

        Card c = new Card("base1-1", "Alakazam", "Rare", "Pokemon", "base1");

        when(deckRepo.findById(1)).thenReturn(d);
        when(cardRepo.findById("base1-1")).thenReturn(Optional.of(c));

        deckCardService.addCardToDeck(1, "base1-1", 2);

        verify(deckCardRepo).addOrUpdate(1, "base1-1", 2);
    }

    @Test
    void addCardToDeck_invalidQuantity_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.addCardToDeck(1, "base1-1", 0)
        );

        verify(deckCardRepo, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_deckNotFound_throws() {
        when(deckRepo.findById(99)).thenReturn(null);

        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.addCardToDeck(99, "base1-1", 1)
        );

        verify(deckRepo).findById(99);
        verify(deckCardRepo, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_cardNotFound_throws() {
        Deck d = new Deck();
        d.setId(1);

        when(deckRepo.findById(1)).thenReturn(d);
        when(cardRepo.findById("invalid")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.addCardToDeck(1, "invalid", 1)
        );

        verify(deckCardRepo, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_invalidDeckId_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.addCardToDeck(0, "base1-1", 1)
        );

        verify(deckCardRepo, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_blankCardId_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.addCardToDeck(1, "   ", 1)
        );

        verify(deckCardRepo, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void removeCardFromDeck_happyPath_returnsTrue() {
        when(deckCardRepo.remove(1, "base1-1")).thenReturn(true);

        boolean result = deckCardService.removeCardFromDeck(1, "base1-1");

        assertTrue(result);
        verify(deckCardRepo).remove(1, "base1-1");
    }

    @Test
    void removeCardFromDeck_invalidDeckId_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.removeCardFromDeck(0, "base1-1")
        );

        verify(deckCardRepo, never()).remove(anyInt(), anyString());
    }

    @Test
    void viewDeckContents_happyPath_returnsJoinRows() {
        Deck d = new Deck();
        d.setId(1);

        when(deckRepo.findById(1)).thenReturn(d);

        DeckCardView v1 = new DeckCardView();
        v1.setDeckId(1);
        v1.setCardId("base1-1");
        v1.setQuantity(2);
        v1.setCardName("Alakazam");

        when(deckCardRepo.findByDeckId(1)).thenReturn(List.of(v1));

        List<DeckCardView> result = deckCardService.viewDeckContents(1);

        assertEquals(1, result.size());
        assertEquals("Alakazam", result.get(0).getCardName());
        verify(deckCardRepo).findByDeckId(1);
    }

    @Test
    void viewDeckContents_deckNotFound_throws() {
        when(deckRepo.findById(99)).thenReturn(null);

        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.viewDeckContents(99)
        );

        verify(deckCardRepo, never()).findByDeckId(anyInt());
    }

    @Test
    void viewDeckContents_invalidDeckId_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckCardService.viewDeckContents(0)
        );

        verify(deckCardRepo, never()).findByDeckId(anyInt());
    }
}
