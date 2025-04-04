package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.OrderDto;

import java.util.List;

public interface OrderService {
    String addOrder(OrderDto orderDto);

    String deleteOrder(Long orderId);

    List<OrderDto> getOrdersByCustomerId(Long customerId);

    String updateOrder(Long orderId, OrderDto orderDto);

    OrderDto getOrderById(Long orderId);
}
