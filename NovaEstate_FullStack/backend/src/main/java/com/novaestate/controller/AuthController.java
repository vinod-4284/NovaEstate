package com.novaestate.controller;

import com.novaestate.dto.AuthDtos.AuthResponse;
import com.novaestate.dto.AuthDtos.LoginRequest;
import com.novaestate.dto.AuthDtos.RegisterRequest;
import com.novaestate.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling authentication requests such as register and login.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // Constructor injection
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Register a new user.
     *
     * @param request RegisterRequest containing user details
     * @return AuthResponse with token or status
     */
    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    /**
     * Login an existing user.
     *
     * @param request LoginRequest containing credentials
     * @return AuthResponse with token or status
     */
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
