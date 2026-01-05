package org.example.Service;

import java.util.List;
import java.util.Optional;

import org.example.Controller.SetDTO;
import org.example.Repository.ISetRepository;
import org.example.api.PokemonTcgApiClient;
import org.example.model.Set;
import org.springframework.stereotype.Service;

@Service
public class SetService {
    private final ISetRepository repository;
    private final PokemonTcgApiClient apiClient;

    public SetService(ISetRepository setRepo, PokemonTcgApiClient apiClient) {
        this.repository = setRepo;
        this.apiClient = apiClient;
    }

    public SetDTO getById(String id) {
        Optional<Set> set = repository.findById(id);
        return set.isEmpty() ? null : SetToDTO(set.get());
    }

    public SetDTO getByName(String name) {
        Optional<Set> set = repository.findByName(name);
        return set.isEmpty() ? null : SetToDTO(set.get());
    }

    /**
     * Get all sets with sync logic:
     * 1. Check if database has sets
     * 2. If empty, fetch from Pokemon TCG API
     * 3. Persist to database
     * 4. Return results
     */
    public List<SetDTO> getAllSets() {
        // Step 1: Check database
        List<Set> dbSets = repository.findAll();
        
        if (!dbSets.isEmpty()) {
            // Found sets in database, return immediately
            return dbSets.stream().map(this::SetToDTO).toList();
        }
        
        // Step 2: No sets in DB, fetch from Pokemon TCG API
        List<Set> apiSets = apiClient.fetchAllSets();
        
        if (apiSets.isEmpty()) {
            // No results from API either
            return List.of();
        }
        
        // Step 3: Persist to database
        List<Set> savedSets = repository.saveAll(apiSets);
        
        // Step 4: Return results
        return savedSets.stream().map(this::SetToDTO).toList();
    }

    private SetDTO SetToDTO(Set set) {
        return new SetDTO(set.getId(), set.getName(), set.getReleaseYear());
    }
}
