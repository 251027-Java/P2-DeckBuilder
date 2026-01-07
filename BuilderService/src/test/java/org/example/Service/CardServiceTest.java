package org.example.Service;

import org.example.Controller.CardDTO;
import org.example.Repository.ICardRepository;
import org.example.Repository.ISetRepository;
import org.example.model.Card;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

    @Mock
    private ICardRepository cardRepository;

    @Mock
    private ISetRepository setRepository;

    @InjectMocks
    private CardService cardService;

    private Card testCard1;
    private Card testCard2;
    private Card testCard3;

    @BeforeEach
    void setUp() {
        testCard1 = new Card();
        testCard1.setId("card1");
        testCard1.setName("Test Card 1");
        testCard1.setRarity("Rare");
        testCard1.setCardType("Monster");
        testCard1.setSetId("set1");

        testCard2 = new Card();
        testCard2.setId("card2");
        testCard2.setName("Test Card 2");
        testCard2.setRarity("Common");
        testCard2.setCardType("Spell");
        testCard2.setSetId("set1");

        testCard3 = new Card();
        testCard3.setId("card3");
        testCard3.setName("Test Card 3");
        testCard3.setRarity("Ultra Rare");
        testCard3.setCardType("Trap");
        testCard3.setSetId("set2");
    }

    @Test
    void getById_ShouldReturnCardDTO_WhenCardExists() {
        when(cardRepository.findById("card1")).thenReturn(Optional.of(testCard1));

        CardDTO result = cardService.getById("card1");

        assertNotNull(result);
        assertEquals("card1", result.id());
        assertEquals("Test Card 1", result.name());
        assertEquals("Rare", result.rarity());
        assertEquals("Monster", result.cardType());
        assertEquals("set1", result.setId());
        verify(cardRepository, times(1)).findById("card1");
    }

    @Test
    void getById_ShouldReturnNull_WhenCardDoesNotExist() {
        when(cardRepository.findById("nonexistent")).thenReturn(Optional.empty());

        CardDTO result = cardService.getById("nonexistent");

        assertNull(result);
        verify(cardRepository, times(1)).findById("nonexistent");
    }

    @Test
    void getBySetId_ShouldReturnListOfCardDTOs_WhenCardsExist() {
        List<Card> cards = Arrays.asList(testCard1, testCard2);
        when(cardRepository.findBySetId("set1")).thenReturn(cards);

        List<CardDTO> result = cardService.getBySetId("set1");

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("card1", result.get(0).id());
        assertEquals("card2", result.get(1).id());
        assertEquals("set1", result.get(0).setId());
        assertEquals("set1", result.get(1).setId());
        verify(cardRepository, times(1)).findBySetId("set1");
    }

    @Test
    void getBySetId_ShouldReturnEmptyList_WhenNoCardsExist() {
        when(cardRepository.findBySetId("set999")).thenReturn(Collections.emptyList());

        List<CardDTO> result = cardService.getBySetId("set999");

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(cardRepository, times(1)).findBySetId("set999");
    }

    @Test
    void getAllCards_ShouldReturnListOfAllCardDTOs() {
        List<Card> allCards = Arrays.asList(testCard1, testCard2, testCard3);
        when(cardRepository.findAll()).thenReturn(allCards);

        List<CardDTO> result = cardService.getAllCards();

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals("card1", result.get(0).id());
        assertEquals("card2", result.get(1).id());
        assertEquals("card3", result.get(2).id());
        verify(cardRepository, times(1)).findAll();
    }

    @Test
    void getAllCards_ShouldReturnEmptyList_WhenNoCardsExist() {
        when(cardRepository.findAll()).thenReturn(Collections.emptyList());

        List<CardDTO> result = cardService.getAllCards();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(cardRepository, times(1)).findAll();
    }
}