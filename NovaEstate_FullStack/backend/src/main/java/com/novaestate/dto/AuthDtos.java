package com.novaestate.dto;

/**
 * DTOs for authentication requests and responses.
 */
public final class AuthDtos {

    // Private constructor to prevent instantiation
    private AuthDtos() {}

    /**
     * DTO for login request.
     */
    public record LoginRequest(
            String email,
            String password
    ) {}

    /**
     * DTO for registration request.
     */
    public record RegisterRequest(
            String name,
            String email,
            String password,
            String phone,
            String city
    ) {}

    /**
     * DTO for authentication response.
     */
    public record AuthResponse(
            String token,
            String name,
            String email,
            String role
    ) {}
}
