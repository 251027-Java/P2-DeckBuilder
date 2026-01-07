package com.revature.lab;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }
    
    @Bean
    public WebClient userWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl("lb://USERSERVICE/user") // Use Eureka service discovery
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}
