package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.User;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface UserRepo extends CrudRepository<User, Long> {


    boolean existsByUsername(String attr0);

    boolean existsByEmail(String email);

    Optional<Object> findByUsernameIgnoreCaseAndIsDeletedFalse(String username);

    Optional<Object> findByVerificationToken(String token);
}
