package org.example.Repository;

import java.util.List;
import java.util.Optional;

import org.example.model.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ISetRepository extends JpaRepository<Set, String>{
    public Optional<Set> findByName(String name);
    
    // Get sets ordered by release year descending (most recent first)
    @Query("SELECT s FROM Set s ORDER BY s.releaseYear DESC, s.id DESC")
    List<Set> findAllOrderByReleaseYearDesc();
}