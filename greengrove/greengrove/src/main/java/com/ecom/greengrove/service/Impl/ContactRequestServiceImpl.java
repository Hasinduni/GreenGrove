package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.ContactRequestDto;
import com.ecom.greengrove.entity.ContactRequest;
import com.ecom.greengrove.entity.User;
import com.ecom.greengrove.repo.ContactRequestRepo;
import com.ecom.greengrove.repo.UserRepo;

import com.ecom.greengrove.service.ContactRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactRequestServiceImpl implements ContactRequestService {

    @Autowired
    private ContactRequestRepo contactRequestRepo;

    @Autowired
    private UserRepo userRepository;

    @Override
    public String saveMessage(ContactRequestDto contactRequestDto) {
        ContactRequest contactRequest = new ContactRequest();

        contactRequest.setEmail(contactRequestDto.getEmail());
        contactRequest.setMessage(contactRequestDto.getMessage());
        contactRequest.setSubmittedAt(contactRequestDto.getSubmittedAt() != null ?
                contactRequestDto.getSubmittedAt() : LocalDateTime.now());

        // Fetch user from database using userId
        if (contactRequestDto.getUserId() != null) {
            User user = userRepository.findById(contactRequestDto.getUserId()).orElse(null);
            contactRequest.setUser(user);
        }

        contactRequestRepo.save(contactRequest);
        return "Message saved successfully";
    }

    @Override
    public List<ContactRequestDto> getAllMessages() {
        List<ContactRequest> contactRequests = contactRequestRepo.findAll();
        return contactRequests.stream().map(request -> {
            ContactRequestDto dto = new ContactRequestDto();
            dto.setEmail(request.getEmail());
            dto.setMessage(request.getMessage());
            dto.setSubmittedAt(request.getSubmittedAt());

            if (request.getUser() != null) {
                dto.setUserId(request.getUser().getId());
            }

            return dto;
        }).toList();
    }

    @Override
    public String SaveMassege(ContactRequestDto contactRequestDto) {
        return "";
    }
}
