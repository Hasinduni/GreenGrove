package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.Customer;
import com.ecom.greengrove.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface DeliveryRepo extends JpaRepository<Delivery, Long> {


}
