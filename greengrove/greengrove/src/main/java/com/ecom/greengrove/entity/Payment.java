package com.ecom.greengrove.entity;

import com.ecom.greengrove.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentId;  // PayHere's payment reference
    private Double amount;
    private String currency;
    private Integer statusCode;
    private long orderId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date paymentDate = new Date();

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
}