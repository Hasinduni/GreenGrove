package com.ecom.greengrove.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDto {
    private Long id;



    private String name;
    private String description;
    private String imageUrl;
    private double price;
    private Boolean stockQuantity;
}
