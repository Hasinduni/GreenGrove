package com.ecom.greengrove.dto;

import com.ecom.greengrove.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactRequestDto {


    private Long id;

    private String name;
    private String email;
    private String message;


    private Long userId;
    private LocalDateTime submittedAt;


}
