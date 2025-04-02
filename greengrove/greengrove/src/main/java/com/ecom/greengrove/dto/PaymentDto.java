package com.ecom.greengrove.dto;

import com.ecom.greengrove.entity.Order;
import com.ecom.greengrove.entity.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentDto {


    private UUID id;

    private Order order;

    private Date paymentDate;

    private Double amount;

    private String paymentMethod;

    private PaymentStatus paymentStatus;
}
