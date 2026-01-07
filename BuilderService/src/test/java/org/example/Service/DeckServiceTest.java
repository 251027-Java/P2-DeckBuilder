package org.example.Service;

import org.example.Repository.IDeckRepository;
import org.example.model.Deck;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeckServiceTest {

    @Mock
    private IDeckRepository deckRepository;

    @InjectMocks
    private DeckService deckService;

    private Deck testDeck1;
    private Deck testDeck2;
    private Deck testDeck3;

    @BeforeEach
    void setUp() {
        testDeck1 = new Deck();
        testDeck1.setId(1);
        testDeck1.setName("Blue-Eyes Deck");
        testDeck1.setDescription("A deck focused on Blue-Eyes White Dragon");

        testDeck2 = new Deck();
        testDeck2.setId(2);
        testDeck2.setName("Dark Magician Deck");
        testDeck2.setDescription("Spellcaster-focused deck");

        testDeck3 = new Deck();
        testDeck3.setId(3);
        testDeck3.setName("Exodia Deck");
        testDeck3.setDescription(null);
    }

    // ==================== createDeck Tests ====================

    @Test
    void createDeck_ShouldCreateDeck_WhenValidInputs() {
        when(deckRepository.findByName("Blue-Eyes Deck")).thenReturn(null);
        when(deckRepository.save(any(Deck.class))).thenReturn(testDeck1);

        Deck result = deckService.createDeck("Blue-Eyes Deck", "A deck focused on Blue-Eyes White Dragon");

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Blue-Eyes Deck", result.getName());
        assertEquals("A deck focused on Blue-Eyes White Dragon", result.getDescription());
        verify(deckRepository, times(1)).findByName("Blue-Eyes Deck");
        verify(deckRepository, times(1)).save(any(Deck.class));
    }

    @Test
    void createDeck_ShouldCreateDeck_WhenDescriptionIsNull() {
        when(deckRepository.findByName("Exodia Deck")).thenReturn(null);
        when(deckRepository.save(any(Deck.class))).thenReturn(testDeck3);

        Deck result = deckService.createDeck("Exodia Deck", null);

        assertNotNull(result);
        assertEquals(3, result.getId());
        assertEquals("Exodia Deck", result.getName());
        assertNull(result.getDescription());
        verify(deckRepository, times(1)).findByName("Exodia Deck");
        verify(deckRepository, times(1)).save(any(Deck.class));
    }

    @Test
    void createDeck_ShouldTrimNameAndDescription() {
        Deck savedDeck = new Deck();
        savedDeck.setId(1);
        savedDeck.setName("Test Deck");
        savedDeck.setDescription("Test Description");

        when(deckRepository.findByName("Test Deck")).thenReturn(null);
        when(deckRepository.save(any(Deck.class))).thenAnswer(invocation -> {
            Deck deck = invocation.getArgument(0);
            assertEquals("Test Deck", deck.getName());
            assertEquals("Test Description", deck.getDescription());
            return savedDeck;
        });

        Deck result = deckService.createDeck("  Test Deck  ", "  Test Description  ");

        assertNotNull(result);
        verify(deckRepository, times(1)).findByName("Test Deck");
        verify(deckRepository, times(1)).save(any(Deck.class));
    }

    @Test
    void createDeck_ShouldThrowException_WhenNameIsNull() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.createDeck(null, "Description")
        );

        assertEquals("Deck name cannot be empty.", exception.getMessage());
        verify(deckRepository, never()).findByName(anyString());
        verify(deckRepository, never()).save(any(Deck.class));
    }

    @Test
    void createDeck_ShouldThrowException_WhenNameIsEmpty() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.createDeck("", "Description")
        );

        assertEquals("Deck name cannot be empty.", exception.getMessage());
        verify(deckRepository, never()).findByName(anyString());
        verify(deckRepository, never()).save(any(Deck.class));
    }

    @Test
    void createDeck_ShouldThrowException_WhenNameIsBlank() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.createDeck("   ", "Description")
        );

        assertEquals("Deck name cannot be empty.", exception.getMessage());
        verify(deckRepository, never()).findByName(anyString());
        verify(deckRepository, never()).save(any(Deck.class));
    }

    @Test
    void createDeck_ShouldThrowException_WhenDeckNameAlreadyExists() {
        when(deckRepository.findByName("Blue-Eyes Deck")).thenReturn(testDeck1);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.createDeck("Blue-Eyes Deck", "Description")
        );

        assertEquals("A deck with that name already exists.", exception.getMessage());
        verify(deckRepository, times(1)).findByName("Blue-Eyes Deck");
        verify(deckRepository, never()).save(any(Deck.class));
    }

    // ==================== listDecks Tests ====================

    @Test
    void listDecks_ShouldReturnAllDecks() {
        List<Deck> allDecks = Arrays.asList(testDeck1, testDeck2, testDeck3);
        when(deckRepository.findAll()).thenReturn(allDecks);

        List<Deck> result = deckService.listDecks();

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals("Blue-Eyes Deck", result.get(0).getName());
        assertEquals("Dark Magician Deck", result.get(1).getName());
        assertEquals("Exodia Deck", result.get(2).getName());
        verify(deckRepository, times(1)).findAll();
    }

    @Test
    void listDecks_ShouldReturnEmptyList_WhenNoDecksExist() {
        when(deckRepository.findAll()).thenReturn(Collections.emptyList());

        List<Deck> result = deckService.listDecks();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(deckRepository, times(1)).findAll();
    }

    // ==================== getDeckById Tests ====================

    @Test
    void getDeckById_ShouldReturnDeck_WhenDeckExists() {
        when(deckRepository.findById(1)).thenReturn(testDeck1);

        Deck result = deckService.getDeckById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Blue-Eyes Deck", result.getName());
        verify(deckRepository, times(1)).findById(1);
    }

    @Test
    void getDeckById_ShouldThrowException_WhenIdIsZero() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.getDeckById(0)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
    }

    @Test
    void getDeckById_ShouldThrowException_WhenIdIsNegative() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.getDeckById(-1)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
    }

    @Test
    void getDeckById_ShouldThrowException_WhenDeckDoesNotExist() {
        when(deckRepository.findById(999)).thenReturn(null);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.getDeckById(999)
        );

        assertEquals("No deck found with id: 999", exception.getMessage());
        verify(deckRepository, times(1)).findById(999);
    }

    // ==================== deleteDeck Tests ====================

    @Test
    void deleteDeck_ShouldReturnTrue_WhenDeckDeletedSuccessfully() {
        when(deckRepository.findById(1)).thenReturn(testDeck1);
        when(deckRepository.deleteById(1)).thenReturn(true);

        boolean result = deckService.deleteDeck(1);

        assertTrue(result);
        verify(deckRepository, times(1)).findById(1);
        verify(deckRepository, times(1)).deleteById(1);
    }

    @Test
    void deleteDeck_ShouldReturnFalse_WhenDeletionFails() {
        when(deckRepository.findById(1)).thenReturn(testDeck1);
        when(deckRepository.deleteById(1)).thenReturn(false);

        boolean result = deckService.deleteDeck(1);

        assertFalse(result);
        verify(deckRepository, times(1)).findById(1);
        verify(deckRepository, times(1)).deleteById(1);
    }

    @Test
    void deleteDeck_ShouldThrowException_WhenIdIsZero() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.deleteDeck(0)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckRepository, never()).deleteById(anyInt());
    }

    @Test
    void deleteDeck_ShouldThrowException_WhenIdIsNegative() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.deleteDeck(-1)
        );

        assertEquals("Deck id must be positive.", exception.getMessage());
        verify(deckRepository, never()).findById(anyInt());
        verify(deckRepository, never()).deleteById(anyInt());
    }

    @Test
    void deleteDeck_ShouldThrowException_WhenDeckDoesNotExist() {
        when(deckRepository.findById(999)).thenReturn(null);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> deckService.deleteDeck(999)
        );

        assertEquals("No deck found with id: 999", exception.getMessage());
        verify(deckRepository, times(1)).findById(999);
        verify(deckRepository, never()).deleteById(anyInt());
    }
}