package org.example.Service;

import org.example.Repository.IDeckRepository;
import org.example.Service.DeckService;
import org.example.model.Deck;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeckServiceTest {

    @Mock
    IDeckRepository deckRepo;

    @InjectMocks
    DeckService deckService;

    @Test
    void createDeck_happyPath() {
        when(deckRepo.findByName("Demo Deck")).thenReturn(null);

        when(deckRepo.save(any(Deck.class))).thenAnswer(inv -> {
            Deck d = inv.getArgument(0);
            d.setId(1);
            return d;
        });

        Deck result = deckService.createDeck("Demo Deck", "starter deck");

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Demo Deck", result.getName());

        verify(deckRepo).findByName("Demo Deck");
        verify(deckRepo).save(any(Deck.class));
    }

    @Test
    void createDeck_blankName_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckService.createDeck("   ", "desc")
        );

        verify(deckRepo, never()).save(any());
    }

    @Test
    void createDeck_duplicateName_throws() {
        Deck existing = new Deck();
        existing.setId(9);
        existing.setName("Demo Deck");

        when(deckRepo.findByName("Demo Deck")).thenReturn(existing);

        assertThrows(IllegalArgumentException.class, () ->
                deckService.createDeck("Demo Deck", "desc")
        );

        verify(deckRepo, never()).save(any());
    }

    @Test
    void deleteDeck_notFound_throws() {
        when(deckRepo.findById(99)).thenReturn(null);

        assertThrows(IllegalArgumentException.class, () ->
                deckService.deleteDeck(99)
        );

        verify(deckRepo).findById(99);
        verify(deckRepo, never()).deleteById(anyInt());
    }

    @Test
    void listDecks_happyPath_returnsAllDecks() {
        Deck d1 = new Deck(1, "Deck 1", "Description 1");
        Deck d2 = new Deck(2, "Deck 2", "Description 2");

        when(deckRepo.findAll()).thenReturn(List.of(d1, d2));

        List<Deck> result = deckService.listDecks();

        assertEquals(2, result.size());
        assertEquals("Deck 1", result.get(0).getName());
        verify(deckRepo).findAll();
    }

    @Test
    void getDeckById_happyPath_returnsDeck() {
        Deck d = new Deck(1, "Test Deck", "Test Description");

        when(deckRepo.findById(1)).thenReturn(d);

        Deck result = deckService.getDeckById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Test Deck", result.getName());
        verify(deckRepo).findById(1);
    }

    @Test
    void getDeckById_invalidId_throws() {
        assertThrows(IllegalArgumentException.class, () ->
                deckService.getDeckById(0)
        );

        verify(deckRepo, never()).findById(anyInt());
    }

    @Test
    void createDeck_nullDescription_createsDeck() {
        when(deckRepo.findByName("Test Deck")).thenReturn(null);
        when(deckRepo.save(any(Deck.class))).thenAnswer(inv -> {
            Deck d = inv.getArgument(0);
            d.setId(1);
            return d;
        });

        Deck result = deckService.createDeck("Test Deck", null);

        assertNotNull(result);
        assertEquals("Test Deck", result.getName());
        assertNull(result.getDescription());
    }

    @Test
    void createDeck_trimsWhitespace() {
        when(deckRepo.findByName("Test Deck")).thenReturn(null);
        when(deckRepo.save(any(Deck.class))).thenAnswer(inv -> {
            Deck d = inv.getArgument(0);
            d.setId(1);
            return d;
        });

        Deck result = deckService.createDeck("  Test Deck  ", "  Description  ");

        assertEquals("Test Deck", result.getName());
        assertEquals("Description", result.getDescription());
    }
}
