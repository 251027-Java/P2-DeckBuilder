package org.example.api;

import java.util.ArrayList;
import java.util.List;

import org.example.api.dto.PokemonTcgCardResponse;
import org.example.api.dto.PokemonTcgSetResponse;
import org.example.model.Card;
import org.example.model.Set;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component
public class PokemonTcgApiClient {

    private final Gson gson = new Gson();
    private final WebClient webClient;

    // Constructor for Spring dependency injection
    public PokemonTcgApiClient(WebClient pokemonTcgWebClient) {
        this.webClient = pokemonTcgWebClient;
    }

    // No-args constructor for backward compatibility with standalone usage (SeedAll)
    public PokemonTcgApiClient() {
        this.webClient = null;
    }

    /**
     * Fetch cards from Pokemon TCG API by name
     * @param name The name to search for
     * @return List of Card entities
     */
    public List<Card> fetchCardsByName(String name) {
        if (webClient == null) {
            throw new IllegalStateException("WebClient not initialized. Use constructor with WebClient parameter.");
        }
        try {
            PokemonTcgCardResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/cards")
                            .queryParam("q", "name:" + name)
                            .build())
                    .retrieve()
                    .bodyToMono(PokemonTcgCardResponse.class)
                    .block();

            if (response == null || response.getData() == null) {
                return new ArrayList<>();
            }

    private final RestClient restClient;

    public PokemonTcgApiClient(RestClient restClient) {
        this.restClient = restClient;
    }


    // Keep the old JSON parsing methods for backward compatibility
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

    public String getSetsFromAPI() {
        String url = "/sets";
        return restClient.get()
            .uri(url)
            .retrieve()
            .body(String.class);
    }

    public String getCardsFromAPI(String setName) {
        String url = "/cards?q=set.name:" + setName;
        return restClient.get()
            .uri(url)
            .retrieve()
            .body(String.class);
    }
}
