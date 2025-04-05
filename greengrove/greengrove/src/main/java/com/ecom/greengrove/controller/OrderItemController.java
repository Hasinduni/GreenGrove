package com.ecom.greengrove.controller;

import com.ecom.greengrove.dto.OrderItemDto;
import com.ecom.greengrove.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/orderitem")
public class OrderItemController {
@Autowired
    private OrderItemService orderItemService;

    @PostMapping("/add")
    public ResponseEntity<String> addOrderItem(@RequestBody OrderItemDto orderItemDto) {
        String response = orderItemService.addOrderItem(orderItemDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable Long id) {
        String response = orderItemService.deleteOrderItem(id);
        return ResponseEntity.ok(response);
    }
}
