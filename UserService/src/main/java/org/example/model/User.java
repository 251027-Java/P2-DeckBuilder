package org.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
        this.username = username;
        this.password = password;
    }


}
