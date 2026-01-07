package org.example.Service;

import org.example.Repository.ICardRepository;
import org.example.Repository.IDeckCardRepository;
import org.example.Repository.IDeckRepository;
import org.example.model.Card;
import org.example.model.Deck;
import org.example.model.DeckCardView;
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
class DeckCardServiceTest {

    @Mock
    private IDeckCardRepository deckCardRepository;

    @Mock
    private IDeckRepository deckRepository;

    @Mock
    private ICardRepository cardRepository;

    @InjectMocks
    private DeckCardService deckCardService;

    private Deck testDeck;
    private Card testCard;
    private DeckCardView testDeckCardView1;
    private DeckCardView testDeckCardView2;

    @BeforeEach
    void setUp() {
        testDeck = new Deck();
        testDeck.setId(1);
        testDeck.setName("Test Deck");

        testCard = new Card();
        testCard.setId("card1");
        testCard.setName("Test Card");
        testCard.setRarity("Rare");

        testDeckCardView1 = mock(DeckCardView.class);
        testDeckCardView2 = mock(DeckCardView.class);
    }

    // ==================== addCardToDeck Tests ====================

    @Test
    void addCardToDeck_ShouldAddCard_WhenValidInputs() {
        when(deckRepository.findById(1)).thenReturn(testDeck);
        when(cardRepository.findById("card1")).thenReturn(Optional.of(testCard));

        deckCardService.addCardToDeck(1, "card1", 3);

        verify(deckRepository, times(1)).findById(1);
        verify(cardRepository, times(1)).findById("card1");
        verify(deckCardRepository, times(1)).addOrUpdate(1, "card1", 3);
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenDeckIdIsZero() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(0, "card1", 1)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenDeckIdIsNegative() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(-1, "card1", 1)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenCardIdIsNull() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(1, null, 1)
        );

        assertEquals("Card id cannot be empty.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenCardIdIsBlank() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(1, "   ", 1)
        );

        assertEquals("Card id cannot be empty.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenQuantityIsZero() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(1, "card1", 0)
        );

        assertEquals("Quantity must be > 0.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenQuantityIsNegative() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(1, "card1", -5)
        );

        assertEquals("Quantity must be > 0.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenDeckDoesNotExist() {
        when(deckRepository.findById(999)).thenReturn(null);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(999, "card1", 1)
        );

        assertEquals("Deck does not exist: id=999", exception.getMessage());
        verify(deckRepository, times(1)).findById(999);
        verify(cardRepository, never()).findById(anyString());
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    @Test
    void addCardToDeck_ShouldThrowException_WhenCardDoesNotExist() {
        when(deckRepository.findById(1)).thenReturn(testDeck);
        when(cardRepository.findById("nonexistent")).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.addCardToDeck(1, "nonexistent", 1)
        );

        assertEquals("Card does not exist: id=nonexistent", exception.getMessage());
        verify(deckRepository, times(1)).findById(1);
        verify(cardRepository, times(1)).findById("nonexistent");
        verify(deckCardRepository, never()).addOrUpdate(anyInt(), anyString(), anyInt());
    }

    // ==================== removeCardFromDeck Tests ====================

    @Test
    void removeCardFromDeck_ShouldReturnTrue_WhenCardRemovedSuccessfully() {
        when(deckCardRepository.remove(1, "card1")).thenReturn(true);

        boolean result = deckCardService.removeCardFromDeck(1, "card1");

        assertTrue(result);
        verify(deckCardRepository, times(1)).remove(1, "card1");
    }

    @Test
    void removeCardFromDeck_ShouldReturnFalse_WhenCardNotFound() {
        when(deckCardRepository.remove(1, "card1")).thenReturn(false);

        boolean result = deckCardService.removeCardFromDeck(1, "card1");

        assertFalse(result);
        verify(deckCardRepository, times(1)).remove(1, "card1");
    }

    @Test
    void removeCardFromDeck_ShouldThrowException_WhenDeckIdIsZero() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.removeCardFromDeck(0, "card1")
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckCardRepository, never()).remove(anyInt(), anyString());
    }

    @Test
    void removeCardFromDeck_ShouldThrowException_WhenDeckIdIsNegative() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.removeCardFromDeck(-1, "card1")
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckCardRepository, never()).remove(anyInt(), anyString());
    }

    @Test
    void removeCardFromDeck_ShouldThrowException_WhenCardIdIsNull() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.removeCardFromDeck(1, null)
        );

        assertEquals("Card id cannot be empty.", exception.getMessage());
        verify(deckCardRepository, never()).remove(anyInt(), anyString());
    }

    @Test
    void removeCardFromDeck_ShouldThrowException_WhenCardIdIsBlank() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.removeCardFromDeck(1, "  ")
        );

        assertEquals("Card id cannot be empty.", exception.getMessage());
        verify(deckCardRepository, never()).remove(anyInt(), anyString());
    }

    // ==================== viewDeckContents Tests ====================

    @Test
    void viewDeckContents_ShouldReturnDeckCardViews_WhenDeckExists() {
        List<DeckCardView> expectedViews = Arrays.asList(testDeckCardView1, testDeckCardView2);
        when(deckRepository.findById(1)).thenReturn(testDeck);
        when(deckCardRepository.findByDeckId(1)).thenReturn(expectedViews);

        List<DeckCardView> result = deckCardService.viewDeckContents(1);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedViews, result);
        verify(deckRepository, times(1)).findById(1);
        verify(deckCardRepository, times(1)).findByDeckId(1);
    }

    @Test
    void viewDeckContents_ShouldReturnEmptyList_WhenDeckHasNoCards() {
        when(deckRepository.findById(1)).thenReturn(testDeck);
        when(deckCardRepository.findByDeckId(1)).thenReturn(Collections.emptyList());

        List<DeckCardView> result = deckCardService.viewDeckContents(1);

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(deckRepository, times(1)).findById(1);
        verify(deckCardRepository, times(1)).findByDeckId(1);
    }

    @Test
    void viewDeckContents_ShouldThrowException_WhenDeckIdIsZero() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.viewDeckContents(0)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).findByDeckId(anyInt());
    }

    @Test
    void viewDeckContents_ShouldThrowException_WhenDeckIdIsNegative() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.viewDeckContents(-1)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckCardRepository, never()).findByDeckId(anyInt());
    }

    @Test
    void viewDeckContents_ShouldThrowException_WhenDeckDoesNotExist() {
        when(deckRepository.findById(999)).thenReturn(null);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckCardService.viewDeckContents(999)
        );

        assertEquals("Deck does not exist: id=999", exception.getMessage());
        verify(deckRepository, times(1)).findById(999);
        verify(deckCardRepository, never()).findByDeckId(anyInt());
    }
}