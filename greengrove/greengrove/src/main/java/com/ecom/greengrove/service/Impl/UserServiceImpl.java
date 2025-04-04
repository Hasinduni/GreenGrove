package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.repo.UserRepo;
import com.ecom.greengrove.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;



}
