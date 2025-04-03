package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.ProductDto;
import com.ecom.greengrove.entity.Product;

import java.util.List;

public interface ProductService {

    String addProduct(ProductDto productDto);

    String updateProduct(Long productId, ProductDto productDto);

    String deleteProduct(Long productId);

    Product getProductById(Long productId);

    List<Product> getAllProducts();

    List<Product> searchProductsByName(String name);
}
