package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.config.PasswordValidator;
import com.ecom.greengrove.dto.requestDTO.UserRequestDTO;
import com.ecom.greengrove.entity.Customer;
import com.ecom.greengrove.entity.User;
import com.ecom.greengrove.exception.*;
import com.ecom.greengrove.repo.UserRepo;
import com.ecom.greengrove.service.UserService;
import com.ecom.greengrove.util.JwtUtil;
import com.ecom.greengrove.util.TokenUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Autowired
    public UserServiceImpl(UserRepo userRepo, ModelMapper modelMapper,
                           PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                           AuthenticationManager authenticationManager,
                           EmailService emailService) {
        this.userRepo = userRepo;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @Override
    public String registerUser(UserRequestDTO userRequestDTO) {
        if (userRepo.existsByUsername(userRequestDTO.getUsername().toLowerCase())) {
            throw new DuplicateUserNameException("Username already registered: " + userRequestDTO.getUsername());
        }
        if (userRepo.existsByEmail(userRequestDTO.getEmail())) {
            throw new DuplicateEmailException("Email already registered: " + userRequestDTO.getEmail());
        }
        if (!PasswordValidator.isValidPassword(userRequestDTO.getPassword())) {
            throw new InvalidValueException("Password does not meet complexity requirements");
        }

        User user = mapToEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        user.setVerificationToken(TokenUtil.generateToken());

        userRepo.save(user);

        sendVerificationEmail(user);

        return "User registered successfully. Please check your email to verify your account.";
    }

    private User mapToEntity(UserRequestDTO userRequestDTO) {
        return switch (userRequestDTO.getRole().toString().toUpperCase()) {
            case "CUSTOMER" -> modelMapper.map(userRequestDTO, Customer.class);
            case "ADMIN" -> modelMapper.map(userRequestDTO, User.class);
            default -> throw new InvalidValueException("Invalid role: " + userRequestDTO.getRole());
        };
    }

    private void sendVerificationEmail(User user) {
        String verifyUrl = "http://yourdomain.com/api/user/verify?token=" + user.getVerificationToken();
        String emailBody = "Please click the following link to verify your email: " + verifyUrl;
        emailService.sendEmail(user.getEmail(), "Verify Your Email", emailBody);
    }


    @Override
    public boolean verifyUser(String token) {
        User user = (User) userRepo.findByVerificationToken(token)
                .orElseThrow(() -> new InvalidValueException("Invalid or expired token"));

        if (user.isVerified()) {
            throw new EmailNotSendException("Email already verified");
        }

        user.setVerified(true);
        user.setVerificationToken(null);
        userRepo.save(user);
        return true;
    }

    @Override
    public void updatePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with ID: " + userId));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new InvalidValueException("Old password is incorrect");
        }

        if (!PasswordValidator.isValidPassword(newPassword)) {
            throw new InvalidValueException("Password does not meet complexity requirements");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }
}
