package org.example.Service;

import org.example.Controller.SetDTO;
import org.example.Repository.ISetRepository;
import org.example.model.Set;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SetService {
    private final ISetRepository repository;

    public SetService(ISetRepository setRepo) {
        this.repository = setRepo;
    }

    public SetDTO getById(String id) {
        Optional<Set> set = repository.findById(id);
        return set.isEmpty() ? null : SetToDTO(set.get());
    }

    public SetDTO getByName(String name) {
        Optional<Set> set = repository.findByName(name);
        return set.isEmpty() ? null : SetToDTO(set.get());
    }

    public List<SetDTO> getAllSets() {
        return repository.findAll().stream().map(this::SetToDTO).toList();
    }

    private SetDTO SetToDTO(Set set) {
        return new SetDTO(set.getId(), set.getName(), set.getReleaseYear());
    }
}
