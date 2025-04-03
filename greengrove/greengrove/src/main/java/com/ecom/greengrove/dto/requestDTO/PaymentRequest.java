package com.ecom.greengrove.dto.requestDTO;

import com.ecom.greengrove.entity.User;
import lombok.Data;

@Data
public class PaymentRequest {
    private Long orderId;
    private double amount;
    private User Customer;
    private String email;
    private String phone;
    private String address;
}
