package org.example.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="sets")
public class Set {
    // Fields
    @Id @GeneratedValue
    private String id;
    
    private String name;
    private Integer releaseYear;

    // Constructors
    public Set() {}
    public Set(String name, Integer releaseYear) {
        this.name = name;
        this.releaseYear = releaseYear;
    }
}
