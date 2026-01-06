package org.example.Service;

import org.example.Controller.CardDTO;
import org.example.Repository.ICardRepository;
import org.example.Repository.ISetRepository;
import org.example.model.Card;
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
class CardServiceTest {

    @Mock
    ICardRepository cardRepo;

    @Mock
    ISetRepository setRepo;

    @InjectMocks
    CardService cardService;

    @Test
    void getById_happyPath_returnsCardDTO() {
        Card c = new Card("base1-1", "Alakazam", "Rare", "Pokemon", "base1");

        when(cardRepo.findById("base1-1")).thenReturn(Optional.of(c));

        CardDTO result = cardService.getById("base1-1");

        assertNotNull(result);
        assertEquals("base1-1", result.id());
        assertEquals("Alakazam", result.name());
        assertEquals("Rare", result.rarity());
        verify(cardRepo).findById("base1-1");
    }

    @Test
    void getById_notFound_returnsNull() {
        when(cardRepo.findById("nope")).thenReturn(Optional.empty());

        CardDTO result = cardService.getById("nope");

        assertNull(result);
        verify(cardRepo).findById("nope");
    }

    @Test
    void getBySetId_happyPath_returnsList() {
        Card c1 = new Card("base1-1", "Alakazam", "Rare", "Pokemon", "base1");
        Card c2 = new Card("base1-2", "Blastoise", "Rare", "Pokemon", "base1");

        when(cardRepo.findBySetId("base1")).thenReturn(List.of(c1, c2));

        List<CardDTO> result = cardService.getBySetId("base1");

        assertEquals(2, result.size());
        assertEquals("Alakazam", result.get(0).name());
        assertEquals("Blastoise", result.get(1).name());
        verify(cardRepo).findBySetId("base1");
    }

    @Test
    void getAllCards_happyPath_returnsList() {
        Card c1 = new Card("base1-1", "Alakazam", "Rare", "Pokemon", "base1");
        Card c2 = new Card("base1-2", "Blastoise", "Rare", "Pokemon", "base1");

        when(cardRepo.findAll()).thenReturn(List.of(c1, c2));

        List<CardDTO> result = cardService.getAllCards();

        assertEquals(2, result.size());
        verify(cardRepo).findAll();
    }
}
