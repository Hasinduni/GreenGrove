package com.ecom.greengrove.dto;

import com.ecom.greengrove.entity.enums.GalleryCategory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GalleryDto  {
    private Long id;


    private String imageUrl;


    private String description;


    private GalleryCategory category;
}
