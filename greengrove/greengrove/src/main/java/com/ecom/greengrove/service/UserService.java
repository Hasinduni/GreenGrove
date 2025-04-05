package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.requestDTO.UserRequestDTO;

public interface UserService {

    String registerUser(UserRequestDTO userRequestDTO);

    boolean verifyUser(String token);

    void updatePassword(Long userId, String oldPassword, String newPassword);
}
