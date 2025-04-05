package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.OrderDto;
import com.ecom.greengrove.entity.Order;

import java.util.List;

public interface OrderService {
    String addOrder(OrderDto orderDto);

    String deleteOrder(Long orderId);



    String updateOrder(Long orderId, OrderDto orderDto);


    Order getOrderById(Long orderId);

    List<Order> getOrdersByCustomerId(Long customerId);
}
