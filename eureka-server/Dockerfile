# Use a lightweight JDK
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from target/
COPY target/*.jar app.jar

# Expose Eureka port
EXPOSE 8761

# Run the app
ENTRYPOINT ["java","-jar","/app.jar"]
