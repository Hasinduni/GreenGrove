package com.ecom.greengrove.repo;

import com.ecom.greengrove.entity.Gallery;
import com.ecom.greengrove.entity.enums.GalleryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface GalleryRepo extends JpaRepository<Gallery, Long> {

    List<Gallery> findByCategory(GalleryCategory category);

}
