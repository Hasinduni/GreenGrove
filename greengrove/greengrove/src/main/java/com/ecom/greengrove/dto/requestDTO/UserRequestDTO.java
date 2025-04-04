package com.ecom.greengrove.dto.requestDTO;

import com.ecom.greengrove.entity.enums.Role;
import lombok.Data;

@Data
public class UserRequestDTO {
    private Long id;


    private String email;


    private String username;

    private String password;

    private Role role;

    private String deliveryAddress;

    private int loyaltyPoints;

}

