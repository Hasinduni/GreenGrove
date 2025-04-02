package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AdminRepo extends JpaRepository<Admin, Long> {

}
