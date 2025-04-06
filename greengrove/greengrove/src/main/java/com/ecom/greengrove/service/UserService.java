package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.LoginRequestDTO;
import com.ecom.greengrove.dto.requestDTO.UserRequestDTO;
import com.ecom.greengrove.dto.responseDTO.LoginResponseDTO;

public interface UserService {

    String registerUser(UserRequestDTO userRequestDTO);



    boolean verifyUser(String token);

    void updatePassword(Long userId, String oldPassword, String newPassword);

    LoginResponseDTO login(LoginRequestDTO loginRequestDTO);
}
