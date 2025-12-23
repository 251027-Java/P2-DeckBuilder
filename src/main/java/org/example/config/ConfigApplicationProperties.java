package org.example.config;

import org.example.DBSetUp;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigApplicationProperties {
    private static Properties props = new Properties();

    private static String url;
    private static String user;
    private static String pass;

    private static void loadProperties() {
        props = new Properties();
        try (InputStream input = ConfigApplicationProperties.class
                .getClassLoader()
                .getResourceAsStream("application.properties")) {
            if (input == null) {
                throw new IllegalStateException("application.properties not found");
            }
            props.load(input);
            url = props.getProperty("DB_URL");
            user = props.getProperty("DB_USER");
            pass = props.getProperty("DB_PASS");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load application.properties", e);
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
                    "Missing DB user. Got: USER=" + user );
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
