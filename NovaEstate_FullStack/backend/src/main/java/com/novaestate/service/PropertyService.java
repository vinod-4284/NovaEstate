package com.novaestate.service;

import com.novaestate.dto.PropertyDtos.PropertyRequest;
import com.novaestate.model.Property;
import com.novaestate.model.User;
import com.novaestate.repository.PropertyRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Service for managing property operations such as
 * listing, creating, updating, and deleting properties.
 */
@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    /**
     * Get all properties sorted by ID in descending order.
     *
     * @return List of properties
     */
    public List<Property> all() {
        return propertyRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    /**
     * Get a property by ID.
     *
     * @param id Property ID
     * @return Property object
     */
    public Property get(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Property not found"));
    }

    /**
     * Create a new property for the given owner.
     *
     * @param request PropertyRequest containing property details
     * @param owner   User who owns the property
     * @return Created Property
     */
    public Property create(PropertyRequest request, User owner) {
        Property property = new Property();
        copy(property, request);
        property.setOwner(owner);
        return propertyRepository.save(property);
    }

    /**
     * Update an existing property.
     *
     * @param id      Property ID
     * @param request PropertyRequest containing updated details
     * @return Updated Property
     */
    public Property update(Long id, PropertyRequest request) {
        Property property = get(id);
        copy(property, request);
        return propertyRepository.save(property);
    }

    /**
     * Delete a property by ID.
     *
     * @param id Property ID
     */
    public void delete(Long id) {
        propertyRepository.deleteById(id);
    }

    /**
     * Copy fields from PropertyRequest to Property entity.
     *
     * @param property Property entity
     * @param request  PropertyRequest DTO
     */
    private void copy(Property property, PropertyRequest request) {
        property.setTitle(request.title());
        property.setType(request.type());
        property.setPurpose(request.purpose());
        property.setPrice(request.price());
        property.setCity(request.city());
        property.setArea(request.area());
        property.setBeds(request.beds());
        property.setBaths(request.baths());
        property.setSqft(request.sqft());
        property.setLatitude(request.latitude());
        property.setLongitude(request.longitude());
        property.setImage(request.image());
        property.setDescription(request.description());
    }
}
