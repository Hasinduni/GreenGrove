package com.ecom.greengrove.controller;

import com.ecom.greengrove.dto.requestDTO.UserRequestDTO;
import com.ecom.greengrove.service.Impl.UserServiceImpl;
import com.ecom.greengrove.service.UserService;
import com.ecom.greengrove.util.StandardResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<StandardResponse> registerUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        String message = userService.registerUser(userRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", message),
                HttpStatus.CREATED);
    }

    @GetMapping("/verify")
    public ResponseEntity<StandardResponse> verifyEmail(@RequestParam String token) {
        boolean verified = userService.verifyUser(token);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Email verified successfully", verified),
                HttpStatus.OK
        );
    }
    @PutMapping("/update-password/{userId}")
    public ResponseEntity<StandardResponse> updatePassword(
            @PathVariable Long userId,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        userService.updatePassword(userId, oldPassword, newPassword);
        return new  ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", "Password updated successfully"),
                HttpStatus.OK
        );
    }

}
