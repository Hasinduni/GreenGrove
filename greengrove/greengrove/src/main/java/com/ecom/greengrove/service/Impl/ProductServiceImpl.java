package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.ProductDto;
import com.ecom.greengrove.entity.Product;
import com.ecom.greengrove.repo.ProductRepo;
import com.ecom.greengrove.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepo;

    @Override
    public String addProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setImageUrl(productDto.getImageUrl());
        product.setStockQuantity(productDto.getStockQuantity());
        productRepo.save(product);
        return ("product added successfully");
    }

    @Override
    public String updateProduct(Long productId, ProductDto productDto) {
        Optional<Product> optionalProduct = productRepo.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
            product.setImageUrl(productDto.getImageUrl());
            product.setStockQuantity(productDto.getStockQuantity());
            productRepo.save(product);
            return "Product updated successfully";
        } else {
            return "Product not found";
        }
    }

    @Override
    public String deleteProduct(Long productId) {
        if (productRepo.existsById(productId)) {
            productRepo.deleteById(productId);
            return "Product deleted successfully";
        } else {
            return "Product not found";
        }
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepo.findById(productId).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public List<Product> searchProductsByName(String name) {
        return productRepo.findByNameContainingIgnoreCase(name);
    }
}
