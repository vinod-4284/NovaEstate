package com.novaestate.service;

import com.novaestate.dto.AuthDtos.AuthResponse;
import com.novaestate.dto.AuthDtos.LoginRequest;
import com.novaestate.dto.AuthDtos.RegisterRequest;
import com.novaestate.model.User;
import com.novaestate.repository.UserRepository;
import com.novaestate.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for handling authentication operations such as
 * user registration and login.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Register a new user.
     *
     * @param request RegisterRequest containing user details
     * @return AuthResponse with JWT token and user info
     */
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setPhone(request.phone());
        user.setCity(request.city());

        userRepository.save(user);

        return new AuthResponse(
                jwtService.generate(user.getEmail()),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    /**
     * Login an existing user.
     *
     * @param request LoginRequest containing credentials
     * @return AuthResponse with JWT token and user info
     */
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return new AuthResponse(
                jwtService.generate(user.getEmail()),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
