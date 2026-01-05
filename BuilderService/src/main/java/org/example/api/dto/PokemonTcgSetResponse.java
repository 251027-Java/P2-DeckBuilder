package org.example.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * DTO for Pokemon TCG API response when fetching sets
 * Matches the structure of: https://api.pokemontcg.io/v2/sets
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PokemonTcgSetResponse {
    private List<PokemonTcgSetData> data;
    private int page;
    private int pageSize;
    private int count;
    private int totalCount;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PokemonTcgSetData {
        private String id;
        private String name;
        private String series;
        private int printedTotal;
        private int total;
        private Legalities legalities;
        private String ptcgoCode;
        private String releaseDate;
        private String updatedAt;
        private Images images;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Legalities {
            private String standard;
            private String expanded;
            private String unlimited;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Images {
            private String symbol;
            private String logo;
        }
    }
}
