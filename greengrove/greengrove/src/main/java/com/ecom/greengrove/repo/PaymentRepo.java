package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@EnableJpaRepositories
public interface PaymentRepo extends JpaRepository<Payment, Long> {
}
