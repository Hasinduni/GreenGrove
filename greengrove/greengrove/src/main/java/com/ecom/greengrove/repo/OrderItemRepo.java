package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.OrderItem;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OrderItemRepo extends CrudRepository<OrderItem, Long> {
}
