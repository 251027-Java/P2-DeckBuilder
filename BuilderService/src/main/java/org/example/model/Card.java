package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="cards")
public class Card {
    @Id
    private String id;
    private String name;
    private String rarity;
    private String cardType;
    private String setId;

    // Constructors
    public Card() {}

    public Card(String id, String name, String rarity, String cardType, String setId) {
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.cardType = cardType;
        this.setId = setId;
    }


}
