# Use lightweight JDK 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy the built Spring Boot JAR
COPY target/*.jar app.jar

# Expose Gateway port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app.jar"]
