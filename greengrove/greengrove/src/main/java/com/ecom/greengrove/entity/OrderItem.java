package com.ecom.greengrove.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orderitem")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false) // Explicitly defining foreign key column
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) // Explicitly defining foreign key column
    private Product product;

    private int quantity;
    private double unitPrice;

}
