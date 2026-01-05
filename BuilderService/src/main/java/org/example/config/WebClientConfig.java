package org.example.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    private static final Logger log = LoggerFactory.getLogger(WebClientConfig.class);

    @Value("${pokemon.tcg.api.base-url:https://api.pokemontcg.io/v2}")
    private String baseUrl;

    @Value("${pokemon.tcg.api.key:}")
    private String apiKey;

    @Bean
    public WebClient pokemonTcgWebClient() {
        WebClient.Builder builder = WebClient.builder()
                .baseUrl(baseUrl);

        // Add API key header if provided
        if (apiKey != null && !apiKey.isEmpty()) {
            builder.defaultHeader("X-Api-Key", apiKey);
            log.info("Pokemon TCG API: Using API key (last 4 chars: ...{})", apiKey.substring(Math.max(0, apiKey.length() - 4)));
        } else {
            log.warn("Pokemon TCG API: No API key configured - using public rate limits");
        }

        return builder.build();
    }
}
