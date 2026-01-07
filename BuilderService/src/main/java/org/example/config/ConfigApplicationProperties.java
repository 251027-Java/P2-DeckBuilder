package org.example.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigApplicationProperties {
    private static Properties props = new Properties();

    private static String url;
    private static String user;
    private static String pass;

    private static void loadProperties() {
        // First check environment variables (for Docker)
        url = System.getenv("SPRING_DATASOURCE_URL");
        user = System.getenv("SPRING_DATASOURCE_USERNAME");
        pass = System.getenv("SPRING_DATASOURCE_PASSWORD");
        
        // If not in environment, load from application.properties
        if (url == null || user == null || pass == null) {
            try (InputStream input = ConfigApplicationProperties.class
                    .getClassLoader()
                    .getResourceAsStream("application.properties")) {
                if (input == null) {
                    throw new IllegalStateException("application.properties not found");
                }
                props.load(input);
                if (url == null) url = props.getProperty("DB_URL");
                if (user == null) user = props.getProperty("DB_USER");
                if (pass == null) pass = props.getProperty("DB_PASS");
            } catch (IOException e) {
                throw new RuntimeException("Failed to load application.properties", e);
            }
        }
    }

    public static String getUrl(){
        loadProperties();
        if (url == null) {
            throw new IllegalStateException(
                    "Missing DB URL. Got: DB_URL=" + url);
        }
        return url;
    }

    public static String getUser(){
        loadProperties();
        if (user == null) {
            throw new IllegalStateException(
                    "Missing DB user. Got: USER=" + user);
        }
        return user;
    }

    public static String getPass(){
        loadProperties();
        if (pass == null) {
            throw new IllegalStateException(
                    "Missing DB password. Got: DB_PASS=" + (pass != null ? "***" : null)
            );
        }
        return pass;
    }

}
