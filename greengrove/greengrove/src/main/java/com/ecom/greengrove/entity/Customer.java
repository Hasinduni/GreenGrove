package com.ecom.greengrove.entity;

import jakarta.mail.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "customers")
public class Customer extends User {

    private String deliveryAddress;
    private int loyaltyPoints;

    @ManyToOne
    @JoinColumn(name = "details_id")
    private Delivery details;


}
