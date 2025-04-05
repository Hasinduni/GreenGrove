package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.ContactRequestDto;

import java.util.List;

public interface ContactRequestService {

    String saveMessage(ContactRequestDto contactRequestDto);

    List<ContactRequestDto> getAllMessages();

    String SaveMassege(ContactRequestDto contactRequestDto);
}
