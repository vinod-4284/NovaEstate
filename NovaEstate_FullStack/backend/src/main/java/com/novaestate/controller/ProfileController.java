package com.novaestate.controller;

import com.novaestate.model.User;
import com.novaestate.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing user profile operations.
 */
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserRepository userRepository;

    // Constructor injection
    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get the currently authenticated user's profile.
     *
     * @param authentication Authentication object containing user details
     * @return User profile
     */
    @GetMapping
    public User me(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Update the authenticated user's profile.
     *
     * @param updatedUser    User object with updated fields
     * @param authentication Authentication object containing user details
     * @return Updated User profile
     */
    @PutMapping
    public User update(@RequestBody User updatedUser, Authentication authentication) {
        User existingUser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(updatedUser.getName());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setCity(updatedUser.getCity());
        existingUser.setBio(updatedUser.getBio());

        return userRepository.save(existingUser);
    }
}
