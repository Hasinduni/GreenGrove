package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.Order;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OrderRepo extends CrudRepository<Order, Long> {
}
