package com.novaestate.config;

import com.novaestate.model.Property;
import com.novaestate.model.User;
import com.novaestate.repository.PropertyRepository;
import com.novaestate.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Seeds demo data into the database on application startup.
 */
@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seed(UserRepository userRepository,
                                  PropertyRepository propertyRepository,
                                  PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed demo user
            if (!userRepository.existsByEmail("demo@novaestate.com")) {
                User demoUser = new User();
                demoUser.setName("Vinod");
                demoUser.setEmail("demo@novaestate.com");
                demoUser.setPassword(passwordEncoder.encode("123456"));
                demoUser.setCity("Hyderabad");
                userRepository.save(demoUser);
            }

            // Seed demo properties
            if (propertyRepository.count() == 0) {
                String[] names = {
                        "Skyline Glass Villa",
                        "Azure Heights Residence",
                        "The Urban Nest",
                        "Neo Park Offices"
                };

                String[] areas = {
                        "Gachibowli",
                        "Kondapur",
                        "Jubilee Hills",
                        "Financial District"
                };

                for (int i = 0; i < names.length; i++) {
                    Property property = new Property();
                    property.setTitle(names[i]);
                    property.setType(i == 0 ? "Villa" : i == 3 ? "Commercial" : "Apartment");
                    property.setPurpose(i == 2 ? "For Rent" : "For Sale");
                    property.setPrice(i == 2 ? 65000.0 : (i + 1) * 8500000.0);
                    property.setCity("Hyderabad");
                    property.setArea(areas[i]);
                    property.setBeds(i == 3 ? 0 : 3 + i % 2);
                    property.setBaths(3);
                    property.setSqft(1800 + i * 500);
                    property.setLatitude(17.44 + i * 0.01);
                    property.setLongitude(78.34 + i * 0.01);
                    property.setImage("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85");
                    property.setDescription("Premium NovaEstate property with modern design and excellent connectivity.");
                    propertyRepository.save(property);
                }
            }
        };
    }
}
