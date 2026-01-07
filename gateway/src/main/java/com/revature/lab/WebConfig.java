package com.revature.lab;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final JwtInterceptor jwti;

    public WebConfig(JwtInterceptor jwti) {
        this.jwti = jwti;
    }

    @Override
    public void addInterceptors(InterceptorRegistry reg) {
        // Interceptor
        // Checks requests except when creating account or logging in
        reg.addInterceptor(jwti)
                .addPathPatterns("/**")
                .excludePathPatterns("auth/register", "auth/login");
    }
}
