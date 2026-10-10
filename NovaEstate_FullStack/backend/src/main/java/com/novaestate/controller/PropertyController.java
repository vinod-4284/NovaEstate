package com.novaestate.controller;

import com.novaestate.dto.PropertyDtos.PropertyRequest;
import com.novaestate.model.Property;
import com.novaestate.model.User;
import com.novaestate.repository.UserRepository;
import com.novaestate.service.PropertyService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing property operations such as
 * listing, creating, updating, and deleting properties.
 */
@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final UserRepository userRepository;

    // Constructor injection
    public PropertyController(PropertyService propertyService, UserRepository userRepository) {
        this.propertyService = propertyService;
        this.userRepository = userRepository;
    }

    /**
     * Get all properties.
     *
     * @return List of properties
     */
    @GetMapping
    public List<Property> all() {
        return propertyService.all();
    }

    /**
     * Get a property by ID.
     *
     * @param id Property ID
     * @return Property object
     */
    @GetMapping("/{id}")
    public Property get(@PathVariable Long id) {
        return propertyService.get(id);
    }

    /**
     * Create a new property for the authenticated user.
     *
     * @param request        PropertyRequest containing property details
     * @param authentication Authentication object with user details
     * @return Created Property
     */
    @PostMapping
    public Property create(@RequestBody PropertyRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return propertyService.create(request, user);
    }

    /**
     * Update an existing property.
     *
     * @param id      Property ID
     * @param request PropertyRequest containing updated details
     * @return Updated Property
     */
    @PutMapping("/{id}")
    public Property update(@PathVariable Long id, @RequestBody PropertyRequest request) {
        return propertyService.update(id, request);
    }

    /**
     * Delete a property by ID.
     *
     * @param id Property ID
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        propertyService.delete(id);
    }
}
