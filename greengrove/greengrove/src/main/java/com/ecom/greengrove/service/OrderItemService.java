package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.OrderItemDto;

public interface OrderItemService {
    String addOrderItem(OrderItemDto orderItemDto);

    String deleteOrderItem(Long orderItemId);
}
