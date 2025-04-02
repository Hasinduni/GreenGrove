package com.ecom.greengrove.entity;

import com.ecom.greengrove.entity.enums.GalleryCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "farm_gallery")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    private GalleryCategory category;
}
