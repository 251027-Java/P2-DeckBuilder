package org.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class RestClientConfig {

    @Value("${API_KEY}")
    String api_key;

    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("X-Api-Key", api_key)
                .baseUrl("https://api.pokemontcg.io/v2").build();
    }
}