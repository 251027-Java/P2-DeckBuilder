package org.example.api;

import com.google.gson.*;
import org.example.model.Card;
import org.example.model.Set;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;

@Component
public class PokemonTcgApiClient {

    private final Gson gson = new Gson();

    private final RestClient restClient;

    public PokemonTcgApiClient(RestClient restClient) {
        this.restClient = restClient;
    }


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
            //s.setId(id);
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

        // 1. Resolve set ID (fast)
        String setJson = restClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/sets")
                .queryParam("q", "name:" + setName)
                .queryParam("select", "id")
                .build())
            .retrieve()
            .body(String.class);
    
        JsonObject setRoot = JsonParser.parseString(setJson).getAsJsonObject();
        JsonArray setData = setRoot.getAsJsonArray("data");
    
        if (setData.isEmpty()) {
            throw new IllegalStateException("No set found: " + setName);
        }
    
        String setId = setData.get(0).getAsJsonObject().get("id").getAsString();
    
        // 2. Query cards using set.id (fast)
        return restClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/cards")
                .queryParam("q", "set.id:" + setId)
                .queryParam("select", "name,types,rarity")
                .queryParam("pageSize", 1)
                .build())
            .retrieve()
            .body(String.class);
    }
    
}
