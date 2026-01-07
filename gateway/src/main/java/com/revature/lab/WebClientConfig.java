package com.revature.lab;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient userWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl("http://localhost:8082/user") // Base URL of the other project
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}
