package org.example.api;

import org.example.DBSetUp;
import org.example.Repository.ICardRepository;
import org.example.Repository.ISetRepository;
import org.example.config.ConfigApplicationProperties;
import org.example.model.Set;
import org.example.model.Card;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Component
public class SeedAll implements CommandLineRunner {

    private ISetRepository setRepo;
    private ICardRepository cardRepo;
    private PokemonTcgApiClient apiClient;

    public SeedAll(ISetRepository setRepo,
                   ICardRepository cardRepo,
                   PokemonTcgApiClient apiClient) {
        this.setRepo = setRepo;
        this.cardRepo = cardRepo;
        this.apiClient = apiClient;
    }

    private static String getUrl() {
        return ConfigApplicationProperties.getUrl();
    }
    private static String getUser() {
        return ConfigApplicationProperties.getUser();
    }
    private static String getPass() {
        return ConfigApplicationProperties.getPass();
    }

    @Override
    public void run(String[] args) {
        try {
            Properties props = new Properties();
            DBSetUp.ensureSchema();

            System.out.println("---- DB Connection Info ----");


            //String jsonSets = apiClient.getSetsFromAPI();
            String jsonSets = apiClient.getSetsFromFile();
            seedSetsFromJson(setRepo, apiClient, jsonSets);

            // Run seed cards once for each set of cards
            // String jsonCards_Base1 = apiClient.getCardsFromAPI("Black Bolt");
            // String jsonCards_Base2 = apiClient.getCardsFromAPI("White Flare");
            // String jsonCards_Base3 = apiClient.getCardsFromAPI("Mega Evolution");
            // String jsonCards_Base4 = apiClient.getCardsFromAPI("Stellar Crown");
            // String jsonCards_Base5 = apiClient.getCardsFromAPI("Temporal Forces");

            // seedCardsFromJsonFiles(cardRepo, apiClient, jsonCards_Base1);
            // seedCardsFromJsonFiles(cardRepo, apiClient, jsonCards_Base2);
            // seedCardsFromJsonFiles(cardRepo, apiClient, jsonCards_Base3);
            // seedCardsFromJsonFiles(cardRepo, apiClient, jsonCards_Base4);
            // seedCardsFromJsonFiles(cardRepo, apiClient, jsonCards_Base5);

            // seedDemoDeckAndCards();

            System.out.println("Seeding complete.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private static void seedSetsFromJson(ISetRepository setRepo,
                                         PokemonTcgApiClient apiClient,
                                         String jsonSets) {
        try {
            List<Set> sets = apiClient.parseSetsFromJson(jsonSets);

            System.out.println("Parsed " + sets.size() + " sets from API");

            for (Set s : sets) {
                setRepo.save(s); // should be safe if save() uses ON CONFLICT
            }

        }catch (Exception e) {
            System.out.println("Error seeding sets: " + e.getMessage());
            e.printStackTrace();
        }
    }


    private static void seedCardsFromJsonFiles(ICardRepository cardRepo,
                                               PokemonTcgApiClient apiClient,
                                               String jsonCards) {
        int totalInserted = 0;
        try {
            List<Card> cards = apiClient.parseCardsFromJson(jsonCards);

            System.out.println("Parsed " + cards.size() + " cards from json");

            for (Card c : cards) {
                cardRepo.save(c);
                totalInserted++;
            }

        } catch (Exception e) {
            System.out.println("Error seeding cards: " + e.getMessage());
            e.printStackTrace();
        }

        System.out.println("Cards count after seeding = " + cardRepo.findAll().size());
    }


    private static void seedDemoDeckAndCards() {
        if (getUrl() == null || getUser() == null || getPass() == null) {
            System.out.println("DB env vars missing; skipping demo deck seeding.");
            return;
        }

        try (Connection conn = DriverManager.getConnection(getUrl(), getUser(), getPass())) {
            conn.setAutoCommit(false);


            int deckId;
            String upsertDeck = """
                INSERT INTO decks (name, description)
                VALUES (?, ?)
                ON CONFLICT (name) DO UPDATE
                    SET description = EXCLUDED.description
                RETURNING id
            """;

            try (PreparedStatement ps = conn.prepareStatement(upsertDeck)) {
                ps.setString(1, "Demo Deck");
                ps.setString(2, "Deck seeded by SeedAll");
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    deckId = rs.getInt(1);
                }
            }


            List<String> cardIds = new ArrayList<>();
            try (PreparedStatement ps = conn.prepareStatement(
                    "SELECT id FROM cards ORDER BY id LIMIT 3");
                 ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    cardIds.add(rs.getString(1));
                }
            }

            if (cardIds.isEmpty()) {
                System.out.println("No cards in DB yet. Skipping deck_cards seeding.");
                conn.rollback();
                return;
            }


            String upsertDeckCards = """
                INSERT INTO deck_cards (deck_id, card_id, quantity)
                VALUES (?, ?, ?)
                ON CONFLICT (deck_id, card_id) DO UPDATE
                    SET quantity = EXCLUDED.quantity
            """;

            try (PreparedStatement ps = conn.prepareStatement(upsertDeckCards)) {
                int qty = 2;
                for (String cardId : cardIds) {
                    ps.setInt(1, deckId);
                    ps.setString(2, cardId);
                    ps.setInt(3, qty);
                    ps.executeUpdate();
                    System.out.println("Added to Demo Deck: " + cardId + " x" + qty);
                    qty = 1;
                }
            }

            conn.commit();
            System.out.println("Seeded Demo Deck with id=" + deckId);

        } catch (Exception e) {
            System.out.println("Error seeding decks/deck_cards: " + e.getMessage());
            e.printStackTrace();
        }
    }
}