package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.GalleryDto;
import com.ecom.greengrove.entity.Gallery;
import com.ecom.greengrove.entity.enums.GalleryCategory;

import java.util.List;

public interface GalleryService {
    String addGallery(GalleryDto galleryDto);

    String updateGallery(Long id, GalleryDto galleryDto);


    List<Gallery> viewAllGalleries();

    String deleteGallery(Long id);

    List<Gallery> viewGalleriesByCategory(GalleryCategory category);


    // GalleryServiceImpl.java

}