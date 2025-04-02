package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ContactRequestRepo extends JpaRepository<ContactRequest, Long> {
}
