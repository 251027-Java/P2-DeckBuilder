[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/W_BIgeTT)
# Lab: Spring Cloud Gateway

## Goal
Set up an API Gateway that routes traffic to your Eureka Client.

## Pre-requisites
-   Running Eureka Server (from Demo).
-   Running Eureka Client (Application Name: `MY-CLIENT`).

## Requirements (Starter Code Provided)
1.  **Dependencies**: `spring-cloud-starter-gateway`, `spring-cloud-starter-netflix-eureka-client`.
2.  **Config**:
    -   Register Gateway with Eureka.
    -   Configure routes in `application.yml`.
3.  **Route Definition**:
    -   Path: `/client/**`
    -   URI: `lb://MY-CLIENT` (Use Load Balancer URI).
4.  **Test**:
    -   Hit `http://localhost:8080/client/hello`.
    -   Ensure it forwards to the Client Service.

## Starter Code
-   `GatewayApp.java` is provided as a stub.
