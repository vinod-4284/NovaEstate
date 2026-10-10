package com.novaestate.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/**
 * Service for generating and validating JWT tokens.
 */
@Service
public class JwtService {

    // Secret key for signing JWTs (should be moved to configuration in production)
    private final Key key = Keys.hmacShaKeyFor(
            "NovaEstate-Super-Secret-Key-2026-Production-Change-Me-123456"
                    .getBytes(StandardCharsets.UTF_8)
    );

    /**
     * Generate a JWT token for the given email.
     *
     * @param email user email
     * @return signed JWT token
     */
    public String generate(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000L)) // 24 hours
                .signWith(key)
                .compact();
    }

    /**
     * Extract email (subject) from a JWT token.
     *
     * @param token JWT token
     * @return email subject
     */
    public String email(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
