package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.GalleryDto;
import com.ecom.greengrove.entity.Gallery;
import com.ecom.greengrove.entity.enums.GalleryCategory;
import com.ecom.greengrove.repo.GalleryRepo;
import com.ecom.greengrove.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryServiceImpl implements GalleryService {
    @Autowired
    private GalleryRepo galleryRepo;

    @Override
    public String addGallery(GalleryDto galleryDto) {
      Gallery gallery = new Gallery();
      gallery.setDescription(galleryDto.getDescription());
      gallery.setCategory(galleryDto.getCategory());
      gallery.setImageUrl(galleryDto.getImageUrl());
      galleryRepo.save(gallery);
      return ("image added successfully");
    }

    @Override
    public String updateGallery(Long id, GalleryDto galleryDto) {
        Optional<Gallery> existingGallery = galleryRepo.findById(id);
        if (existingGallery.isPresent()) {
            Gallery gallery = existingGallery.get();
            gallery.setDescription(galleryDto.getDescription());
            gallery.setCategory(galleryDto.getCategory());
            gallery.setImageUrl(galleryDto.getImageUrl());
            galleryRepo.save(gallery);
            return "Gallery updated successfully";
        } else {
            return "Gallery not found";
        }
    }

    @Override
    public List<Gallery> viewAllGalleries() {
        return (List<Gallery>) galleryRepo.findAll();
    }



    @Override
    public String deleteGallery(Long id) {
        Optional<Gallery> existingGallery = galleryRepo.findById(id);
        if (existingGallery.isPresent()) {
            galleryRepo.deleteById(id);
            return "Gallery deleted successfully";
        } else {
            return "Gallery not found";
        }
    }



    @Override
    public List<Gallery> viewGalleriesByCategory(GalleryCategory category) {
        return galleryRepo.findByCategory(category);
    }
}
