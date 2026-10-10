package com.novaestate.repository;

import com.novaestate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for User entity.
 * Provides CRUD operations and custom queries.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by email.
     *
     * @param email unique email of the user
     * @return Optional containing User if found
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if a user exists by email.
     *
     * @param email unique email of the user
     * @return true if user exists, false otherwise
     */
    boolean existsByEmail(String email);
}
