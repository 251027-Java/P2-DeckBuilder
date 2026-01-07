package com.revature.lab;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
public class AuthController {
    public record AuthRequest(String username, String password){}
    public record AuthResponse(String token){}

    private final UserServiceClient userclient;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserServiceClient userclient, PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userclient = userclient;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public Mono<UserDTO> register(@RequestBody AuthRequest request) {
        // Encode the password
        String encodedPassword = passwordEncoder.encode(request.password());

        return userclient.createUserAccount(request.username(), encodedPassword);
    }

    @PostMapping("/login")
    public Mono<AuthResponse> login(@RequestBody AuthRequest request) {
        return userclient.getUserAccount(request.username()).map(user -> {
            // Check Password Matches
            if(!passwordEncoder.matches(request.password(), user.password())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
            }

            // Generate token
            String token = jwtUtil.generateToken(user.username());
            return new AuthResponse(token);
        })
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found")));
    }
}
