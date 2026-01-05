package org.example.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * DTO for Pokemon TCG API response when fetching cards
 * Matches the structure of: https://api.pokemontcg.io/v2/cards
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PokemonTcgCardResponse {
    private List<PokemonTcgCardData> data;
    private int page;
    private int pageSize;
    private int count;
    private int totalCount;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PokemonTcgCardData {
        private String id;
        private String name;
        private String supertype;  // "Pokémon", "Trainer", "Energy"
        private List<String> subtypes;
        private String hp;
        private List<String> types;
        private String rarity;
        private String artist;
        private PokemonTcgSetInfo set;
        private String number;
        private Images images;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class PokemonTcgSetInfo {
            private String id;
            private String name;
            private String series;
            private int printedTotal;
            private int total;
            private String ptcgoCode;
            private String releaseDate;
            private String updatedAt;
            private Images images;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Images {
            private String small;
            private String large;
        }
    }
}
