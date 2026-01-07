package org.example.Service;

import org.example.Controller.SetDTO;
import org.example.Repository.ISetRepository;
import org.example.model.Set;
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
class SetServiceTest {

    @Mock
    private ISetRepository setRepository;

    @InjectMocks
    private SetService setService;

    private Set testSet1;
    private Set testSet2;
    private Set testSet3;

    @BeforeEach
    void setUp() {
        testSet1 = new Set();
        testSet1.setId("set1");
        testSet1.setName("Legend of Blue Eyes White Dragon");
        testSet1.setReleaseYear(2002);

        testSet2 = new Set();
        testSet2.setId("set2");
        testSet2.setName("Metal Raiders");
        testSet2.setReleaseYear(2002);

        testSet3 = new Set();
        testSet3.setId("set3");
        testSet3.setName("Spell Ruler");
        testSet3.setReleaseYear(2003);
    }

    // ==================== getById Tests ====================

    @Test
    void getById_ShouldReturnSetDTO_WhenSetExists() {
        when(setRepository.findById("set1")).thenReturn(Optional.of(testSet1));

        SetDTO result = setService.getById("set1");

        assertNotNull(result);
        assertEquals("set1", result.id());
        assertEquals("Legend of Blue Eyes White Dragon", result.name());
        assertEquals(2002, result.releaseYear());
        verify(setRepository, times(1)).findById("set1");
    }

    @Test
    void getById_ShouldReturnNull_WhenSetDoesNotExist() {
        when(setRepository.findById("nonexistent")).thenReturn(Optional.empty());

        SetDTO result = setService.getById("nonexistent");

        assertNull(result);
        verify(setRepository, times(1)).findById("nonexistent");
    }

    // ==================== getByName Tests ====================

    @Test
    void getByName_ShouldReturnSetDTO_WhenSetExists() {
        when(setRepository.findByName("Metal Raiders")).thenReturn(Optional.of(testSet2));

        SetDTO result = setService.getByName("Metal Raiders");

        assertNotNull(result);
        assertEquals("set2", result.id());
        assertEquals("Metal Raiders", result.name());
        assertEquals(2002, result.releaseYear());
        verify(setRepository, times(1)).findByName("Metal Raiders");
    }

    @Test
    void getByName_ShouldReturnNull_WhenSetDoesNotExist() {
        when(setRepository.findByName("Nonexistent Set")).thenReturn(Optional.empty());

        SetDTO result = setService.getByName("Nonexistent Set");

        assertNull(result);
        verify(setRepository, times(1)).findByName("Nonexistent Set");
    }

    @Test
    void getByName_ShouldHandleNullName() {
        when(setRepository.findByName(null)).thenReturn(Optional.empty());

        SetDTO result = setService.getByName(null);

        assertNull(result);
        verify(setRepository, times(1)).findByName(null);
    }

    // ==================== getAllSets Tests ====================

    @Test
    void getAllSets_ShouldReturnListOfAllSetDTOs() {
        List<Set> allSets = Arrays.asList(testSet1, testSet2, testSet3);
        when(setRepository.findAll()).thenReturn(allSets);

        List<SetDTO> result = setService.getAllSets();

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals("set1", result.get(0).id());
        assertEquals("Legend of Blue Eyes White Dragon", result.get(0).name());
        assertEquals(2002, result.get(0).releaseYear());
        assertEquals("set2", result.get(1).id());
        assertEquals("Metal Raiders", result.get(1).name());
        assertEquals(2002, result.get(1).releaseYear());
        assertEquals("set3", result.get(2).id());
        assertEquals("Spell Ruler", result.get(2).name());
        assertEquals(2003, result.get(2).releaseYear());
        verify(setRepository, times(1)).findAll();
    }

    @Test
    void getAllSets_ShouldReturnEmptyList_WhenNoSetsExist() {
        when(setRepository.findAll()).thenReturn(Collections.emptyList());

        List<SetDTO> result = setService.getAllSets();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(setRepository, times(1)).findAll();
    }

    @Test
    void getAllSets_ShouldReturnSingleSetList_WhenOnlyOneSetExists() {
        when(setRepository.findAll()).thenReturn(Collections.singletonList(testSet1));

        List<SetDTO> result = setService.getAllSets();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("set1", result.get(0).id());
        assertEquals("Legend of Blue Eyes White Dragon", result.get(0).name());
        verify(setRepository, times(1)).findAll();
    }
}