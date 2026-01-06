package org.example.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="sets")
public class Set {
    // Fields
    @Id
    private String id;
    
    private String name;
    private Integer releaseYear;

    // Constructors
    public Set() {}
    public Set(String id, String name, Integer releaseYear) {
        this.id = id;
        this.name = name;
        this.releaseYear = releaseYear;
    }
}
