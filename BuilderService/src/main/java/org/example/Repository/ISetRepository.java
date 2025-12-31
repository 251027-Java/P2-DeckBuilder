package org.example.Repository;

import org.example.model.Set;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ISetRepository extends JpaRepository<Set, String>{
    public Optional<Set> findByName(String name);
}
