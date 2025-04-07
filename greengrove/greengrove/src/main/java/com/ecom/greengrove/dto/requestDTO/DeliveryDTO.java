package com.ecom.greengrove.dto.requestDTO;

public class DeliveryDTO {
    private Long id;

    private String fullName;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phone;
    private String email;

    public Long getId() {
        return id;
    }
}
