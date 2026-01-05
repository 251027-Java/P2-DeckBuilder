package org.example.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="cards")
public class Card {
    @Id
    @Column(name = "card_id")
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
