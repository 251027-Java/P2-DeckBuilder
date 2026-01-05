package org.example.Repository;

import java.util.List;

import org.example.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICardRepository extends JpaRepository<Card, String> {
    List<Card> findBySetId(String setId);
    List<Card> findByNameContainingIgnoreCase(String name);
}