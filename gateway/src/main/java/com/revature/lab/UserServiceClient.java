package com.revature.lab;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class UserServiceClient {
    private final WebClient client;

    public UserServiceClient(WebClient webClient) {
        this.client = webClient;
    }

    // Get user if exists
    public Mono<UserDTO> getUserAccount(String username) {
        return this.client.get()
                .uri("/search?username=" + username)
                .retrieve()
                .bodyToMono(UserDTO.class);
    }

    // Create new user
    public Mono<UserDTO> createUserAccount(String username, String password) {
        return this.client.post()
                .uri("")
                .bodyValue(new UserDTO(username, password))
                .retrieve()
                .bodyToMono(UserDTO.class);
    }
}