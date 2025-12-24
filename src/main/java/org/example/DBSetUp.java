package org.example;

import org.example.config.ConfigApplicationProperties;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.List;
import java.util.Properties;


public final class DBSetUp {

    public static void ensureSchema() throws SQLException {
        System.out.println("URL: "+ConfigApplicationProperties.getUrl());
        try (Connection c = DriverManager.getConnection(ConfigApplicationProperties.getUrl(), ConfigApplicationProperties.getUser(), ConfigApplicationProperties.getPass())) {
            c.setAutoCommit(false);

            for (String ddl : List.of(
                    // Sets
                    """
                    CREATE TABLE IF NOT EXISTS sets (
                        id           VARCHAR PRIMARY KEY,
                        name         VARCHAR NOT NULL,
                        release_year INT
                    )
                    """,

                    // Cards
                    """
                    CREATE TABLE IF NOT EXISTS cards (
                        id        VARCHAR PRIMARY KEY,
                        name      VARCHAR NOT NULL,
                        rarity    VARCHAR,
                        card_type VARCHAR,
                        set_id    VARCHAR REFERENCES sets(id)
                    )
                    """,

                    // Decks
                    """
                    CREATE TABLE IF NOT EXISTS decks (
                        id          SERIAL PRIMARY KEY,
                        name        VARCHAR NOT NULL UNIQUE,
                        description VARCHAR,
                        created_at  TIMESTAMP NOT NULL DEFAULT NOW()
                    )
                    """,

                    // Deck_cards
                    """
                    CREATE TABLE IF NOT EXISTS deck_cards (
                        deck_id   INT     NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
                        card_id   VARCHAR NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
                        quantity  INT     NOT NULL CHECK (quantity > 0),
                        PRIMARY KEY (deck_id, card_id)
                    )
                    """
            )) {
                try (PreparedStatement ps = c.prepareStatement(ddl)) {
                    ps.executeUpdate();
                }
            }

            c.commit();
        }
    }
}


/*
to delete all tables

docker exec -it p0-postgres \
  psql -U admin -d p0tcg \
  -c "DROP TABLE IF EXISTS deck_cards, decks, cards, sets CASCADE;"

*/

