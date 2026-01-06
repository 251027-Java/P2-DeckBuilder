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

            // Step 1: Seed sets ONLY ONCE - Check if already seeded
            System.out.println("\n=== Checking Sets ===");
            long existingSetCount = setRepo.count();
            
            if (existingSetCount == 0) {
                System.out.println("No sets found in database. Fetching from API...");
                String jsonSets = null;
                
                try {
                    jsonSets = apiClient.getSetsFromAPI();
                } catch (Exception e) {
                    System.out.println("ERROR: Failed to fetch sets from API: " + e.getMessage());
                    System.out.println("The Pokemon TCG API may be down. Please try again later.");
                    return;
                }
                
                if (jsonSets == null || jsonSets.isEmpty()) {
                    System.out.println("ERROR: No data returned from API");
                    return;
                }
                
                seedSetsFromJson(setRepo, apiClient, jsonSets);
                Thread.sleep(2000);
            } else {
                System.out.println("Found " + existingSetCount + " sets already in database. Skipping set seeding.");
            }

            // Step 2: Seed cards for first 5 sets in database
            System.out.println("\n=== Seeding Cards ===");
            
            List<Set> allSets = setRepo.findAll();
            int setsToProcess = Math.min(5, allSets.size());
            
            System.out.println("Found " + allSets.size() + " total sets. Processing first " + setsToProcess + " sets...");
            
            for (int i = 0; i < setsToProcess; i++) {
                Set set = allSets.get(i);
                String setId = set.getId();
                
                try {
                    // Check if cards already exist for this set
                    long cardsInSet = cardRepo.countBySetId(setId);
                    if (cardsInSet > 0) {
                        System.out.println("Set '" + set.getName() + "' (ID: " + setId + ") already has " + cardsInSet + " cards. Skipping...");
                        continue;
                    }
                    
                    System.out.println("Fetching cards for set: " + set.getName() + " (ID: " + setId + ")");
                    String jsonCards = apiClient.getCardsBySetId(setId);
                    
                    if (jsonCards == null || jsonCards.isEmpty()) {
                        System.out.println("WARNING: No cards returned for set: " + set.getName());
                        continue;
                    }
                    
                    seedCardsFromJsonFiles(setRepo, cardRepo, apiClient, jsonCards, setId);
                    
                    // Rate limiting - wait between API calls
                    Thread.sleep(1000);
                } catch (Exception e) {
                    System.out.println("ERROR seeding cards for set '" + set.getName() + "' (ID: " + setId + "): " + e.getMessage());
                    // Continue with next set instead of failing
                }
            }

            // Step 3: Seed demo deck
            System.out.println("\n=== Seeding Demo Deck ===");
            seedDemoDeckAndCards();

            System.out.println("\n=== Seeding Complete ===");
            System.out.println("Total sets in database: " + setRepo.count());
            System.out.println("Total cards in database: " + cardRepo.count());

        } catch (Exception e) {
            System.out.println("FATAL ERROR during seeding: " + e.getMessage());
            e.printStackTrace();
        }
    }


    private static void seedSetsFromJson(ISetRepository setRepo,
                                         PokemonTcgApiClient apiClient,
                                         String jsonSets) {
        try {
            List<Set> sets = apiClient.parseSetsFromJson(jsonSets);

            System.out.println("Parsed " + sets.size() + " sets from API");

            int savedCount = 0;
            int skippedCount = 0;
            
            for (Set s : sets) {
                try {
                    if (s.getId() == null || s.getId().isEmpty()) {
                        System.out.println("WARNING: Skipping set with null/empty ID: " + s.getName());
                        skippedCount++;
                        continue;
                    }
                    
                    // Check if set already exists before saving
                    if (setRepo.existsById(s.getId())) {
                        System.out.println("Set already exists: " + s.getName() + " (ID: " + s.getId() + ")");
                        skippedCount++;
                        continue;
                    }
                    
                    setRepo.save(s);
                    savedCount++;
                } catch (Exception e) {
                    System.out.println("ERROR saving set " + s.getName() + " (ID: " + s.getId() + "): " + e.getMessage());
                    skippedCount++;
                }
            }
            
            System.out.println("Successfully saved " + savedCount + " new sets");
            System.out.println("Skipped " + skippedCount + " sets (already exist or invalid)");

        } catch (Exception e) {
            System.out.println("Error seeding sets: " + e.getMessage());
            e.printStackTrace();
        }
    }


    private static void seedCardsFromJsonFiles(ISetRepository setRepo,
                                               ICardRepository cardRepo,
                                               PokemonTcgApiClient apiClient,
                                               String jsonCards,
                                               String setId) {
        int totalInserted = 0;
        int totalSkipped = 0;
        try {
            if (jsonCards == null || jsonCards.isEmpty()) {
                System.out.println("WARNING: Empty JSON for set: " + setId);
                return;
            }
            
            List<Card> cards = apiClient.parseCardsFromJson(jsonCards);
            System.out.println("Parsed " + cards.size() + " cards from JSON for set: " + setId);

            for (Card c : cards) {
                try {
                    // Validate card has required fields
                    if (c.getId() == null || c.getId().isEmpty()) {
                        System.out.println("WARNING: Skipping card with null/empty ID: " + c.getName());
                        totalSkipped++;
                        continue;
                    }
                    
                    if (c.getSetId() == null || c.getSetId().isEmpty()) {
                        System.out.println("WARNING: Skipping card with null/empty setId: " + c.getName() + " (ID: " + c.getId() + ")");
                        totalSkipped++;
                        continue;
                    }
                    
                    // Check if the set exists before saving card
                    if (!setRepo.existsById(c.getSetId())) {
                        System.out.println("WARNING: Set ID '" + c.getSetId() + "' does not exist. Skipping card: " + c.getName());
                        totalSkipped++;
                        continue;
                    }
                    
                    // Check if card already exists
                    if (cardRepo.existsById(c.getId())) {
                        totalSkipped++;
                        continue;
                    }
                    
                    cardRepo.save(c);
                    totalInserted++;
                    
                } catch (Exception e) {
                    System.out.println("ERROR saving card " + c.getName() + " (ID: " + c.getId() + "): " + e.getMessage());
                    totalSkipped++;
                }
            }

            System.out.println("Set: " + setId + " - Inserted: " + totalInserted + ", Skipped: " + totalSkipped);
            System.out.println("Total cards in database: " + cardRepo.count());

        } catch (Exception e) {
            System.out.println("Error seeding cards for set " + setId + ": " + e.getMessage());
            e.printStackTrace();
        }
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