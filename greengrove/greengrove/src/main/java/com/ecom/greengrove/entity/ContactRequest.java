package com.ecom.greengrove.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ContactRequest {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
    private String message;

    @ManyToOne
    private User user;
}
