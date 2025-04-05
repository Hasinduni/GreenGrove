package com.ecom.greengrove.controller;

import com.ecom.greengrove.dto.GalleryDto;
import com.ecom.greengrove.entity.Gallery;
import com.ecom.greengrove.entity.enums.GalleryCategory;
import com.ecom.greengrove.service.GalleryService;
import com.ecom.greengrove.service.Impl.GalleryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @PostMapping("/add")
    public ResponseEntity<String> addGallery(@RequestBody GalleryDto galleryDto) {
        String response = galleryService.addGallery(galleryDto);
        return ResponseEntity.ok(response);
    }

    // Update an existing gallery image
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateGallery(@PathVariable Long id, @RequestBody GalleryDto galleryDto) {
        String response = galleryService.updateGallery(id, galleryDto);
        return ResponseEntity.ok(response);
    }

    // Delete an existing gallery image
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteGallery(@PathVariable Long id) {
        String response = galleryService.deleteGallery(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/viewByCategory/{category}")
    public ResponseEntity<List<Gallery>> viewGalleriesByCategory(@PathVariable GalleryCategory category) {
        List<Gallery> galleries = galleryService.viewGalleriesByCategory(category);
        return ResponseEntity.ok(galleries);
    }

}
