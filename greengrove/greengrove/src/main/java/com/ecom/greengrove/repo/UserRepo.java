package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    // Checks if the email exists
    boolean existsByEmail(@NotBlank @Email String email);

    // Finds a user by their verification token
    Optional<User> findByVerificationToken(String token);

    // Finds a user by their username and ensures the user is not deleted
    Optional<User> findByUsernameAndIsDeletedFalse(String username);

    // Finds a user by their email
    Optional<User> findByEmail(String email);


}

