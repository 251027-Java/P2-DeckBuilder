package org.example.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name="users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"username"})
        }
)
@Data
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue
    private Long userId;

    @Column(unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public User(String username, String password) {
        this.password = password;
        this.password = password;
    }


}
