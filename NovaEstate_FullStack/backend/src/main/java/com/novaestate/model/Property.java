package com.novaestate.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity representing a property in the system.
 */
@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String type;
    private String purpose;
    private Double price;
    private String city;
    private String area;
    private Integer beds;
    private Integer baths;
    private Integer sqft;
    private Double latitude;
    private Double longitude;

    @Column(length = 2000)
    private String image;

    @Column(length = 3000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;
}
