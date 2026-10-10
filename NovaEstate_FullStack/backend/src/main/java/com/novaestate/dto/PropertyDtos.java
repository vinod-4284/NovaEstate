package com.novaestate.dto;

/**
 * DTOs for property-related requests.
 */
public final class PropertyDtos {

    // Private constructor to prevent instantiation
    private PropertyDtos() {}

    /**
     * DTO for creating or updating a property.
     */
    public record PropertyRequest(
            String title,
            String type,
            String purpose,
            Double price,
            String city,
            String area,
            Integer beds,
            Integer baths,
            Integer sqft,
            Double latitude,
            Double longitude,
            String image,
            String description
    ) {}
}
