package com.ecom.greengrove.dto;

import com.ecom.greengrove.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

    private Long id;


    private String email;


    private String username;


    private String password;


    private Role role;
}
