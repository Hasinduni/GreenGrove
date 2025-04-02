package com.ecom.greengrove.dto;

import com.ecom.greengrove.entity.Customer;
import com.ecom.greengrove.entity.OrderItem;
import com.ecom.greengrove.entity.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDto {


    private Long id;
    private Customer customer;
    private LocalDateTime orderDate;
    private double totalAmount;
    private OrderStatus status; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    private List<OrderItem> orderItems;
}
