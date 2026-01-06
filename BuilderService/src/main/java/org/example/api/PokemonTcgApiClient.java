package org.example.api;

import com.google.gson.*;
import org.example.model.Card;
import org.example.model.Set;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.HttpServerErrorException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class PokemonTcgApiClient {
    private final Gson gson = new Gson();
    private final RestClient restClient;
    private static final Logger log = LoggerFactory.getLogger(PokemonTcgApiClient.class);
    
    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_BACKOFF = 2000; // 2 seconds
    
    public PokemonTcgApiClient(RestClient restClient) {
        this.restClient = restClient;
    }
    
    // Parse methods - KEEP THESE!
    public List<Set> parseSetsFromJson(String json) {
        JsonObject root = JsonParser.parseString(json).getAsJsonObject();
        JsonArray data = root.getAsJsonArray("data");
        List<Set> result = new ArrayList<>();
        
        for (JsonElement elem : data) {
            JsonObject obj = elem.getAsJsonObject();
            String id = obj.get("id").getAsString();
            String name = obj.get("name").getAsString();
            Integer releaseYear = null;
            
            if (obj.has("releaseDate") && !obj.get("releaseDate").isJsonNull()) {
                String releaseDate = obj.get("releaseDate").getAsString();
                if (releaseDate.length() >= 4) {
                    releaseYear = Integer.parseInt(releaseDate.substring(0, 4));
                }
            }
            
            Set s = new Set();
            s.setId(id);
            s.setName(name);
            s.setReleaseYear(releaseYear);
            result.add(s);
        }
        return result;
    }
    
    public List<Card> parseCardsFromJson(String json) {
        JsonObject root = JsonParser.parseString(json).getAsJsonObject();
        JsonArray data = root.getAsJsonArray("data");
        List<Card> cards = new ArrayList<>();
        
        for (JsonElement elem : data) {
            JsonObject obj = elem.getAsJsonObject();
            String id = obj.get("id").getAsString();
            String name = obj.get("name").getAsString();
            String rarity = obj.has("rarity") && !obj.get("rarity").isJsonNull()
                    ? obj.get("rarity").getAsString()
                    : null;
            String cardType = obj.has("supertype") && !obj.get("supertype").isJsonNull()
                    ? obj.get("supertype").getAsString()
                    : null;
            String setId = obj.getAsJsonObject("set").get("id").getAsString();
            
            Card c = new Card(id, name, rarity, cardType, setId);
            cards.add(c);
        }
        return cards;
    }
    
    // API fetch methods with retry logic
    public String getSetsFromAPI() {
        return fetchWithRetry("/sets");
    }
    
    public String getCardsFromAPI(String setName) {
        String url = "/cards?q=set.name:" + setName;
        return fetchWithRetry(url);
    }
    
    public String getCardsBySetId(String setId) {
        String url = "/cards?q=set.id:" + setId;
        return fetchWithRetry(url);
    }
    
    private String fetchWithRetry(String url) {
        int attempt = 0;
        long backoff = INITIAL_BACKOFF;
        
        while (attempt < MAX_RETRIES) {
            try {
                log.info("Fetching from {}, attempt {}/{}", url, attempt + 1, MAX_RETRIES);
                
                String response = restClient.get()
                    .uri(url)
                    .retrieve()
                    .body(String.class);
                    
                log.info("Successfully fetched data from {}", url);
                return response;
                
            } catch (HttpServerErrorException.GatewayTimeout e) {
                attempt++;
                if (attempt >= MAX_RETRIES) {
                    log.error("Failed to fetch {} after {} attempts", url, MAX_RETRIES);
                    throw e;
                }
                
                log.warn("Gateway timeout on attempt {}/{}. Retrying in {}ms...", 
                         attempt, MAX_RETRIES, backoff);
                
                try {
                    Thread.sleep(backoff);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Interrupted during retry backoff", ie);
                }
                
                backoff *= 2; // Exponential backoff
                
            } catch (Exception e) {
                log.error("Unexpected error fetching from {}: {}", url, e.getMessage());
                throw e;
            }
        }
        
        return null;
    }
}