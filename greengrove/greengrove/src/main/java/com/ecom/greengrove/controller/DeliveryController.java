package com.ecom.greengrove.controller;

import com.ecom.greengrove.dto.requestDTO.DeliveryDTO;
import com.ecom.greengrove.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    // Add Delivery
    @PostMapping
    public ResponseEntity<String> addDelivery(@RequestBody DeliveryDTO deliveryDTO) {
        String result = deliveryService.addDelivery(deliveryDTO);
        return ResponseEntity.ok(result);
    }

    // Delete Delivery
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDelivery(@PathVariable Long id) {
        String result = deliveryService.deleteDelivery(id);
        return ResponseEntity.ok(result);
    }
}


