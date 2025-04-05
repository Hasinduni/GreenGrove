package com.ecom.greengrove.controller;

import com.ecom.greengrove.dto.ContactRequestDto;
import com.ecom.greengrove.service.ContactRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/contact")
public class ContactRequestController {
@Autowired
private ContactRequestService contactRequestService;
    @PostMapping("save")
    public ResponseEntity<String> saveMessage(@RequestBody ContactRequestDto contactRequestDto) {
        String response = contactRequestService.SaveMassege(contactRequestDto);
        return ResponseEntity.ok(response);
    }

    // GET: Get all messages
    @GetMapping("/all-message")
    public ResponseEntity<List<ContactRequestDto>> getAllMessages() {
        List<ContactRequestDto> messages = contactRequestService.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
