package org.example.Repository;

import org.example.model.Card;
import org.example.model.Set;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ICardRepository extends JpaRepository<Card, String> {
    List<Card> findBySetId(String setId);
}