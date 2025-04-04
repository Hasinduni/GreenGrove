package com.ecom.greengrove.dto;

import com.ecom.greengrove.entity.Order;
import com.ecom.greengrove.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemDto {


    private Long id;


    private Long order;


    private Long product;

    private int quantity;
    private double unitPrice;


}
