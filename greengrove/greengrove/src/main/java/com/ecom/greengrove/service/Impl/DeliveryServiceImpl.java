package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.requestDTO.DeliveryDTO;
import com.ecom.greengrove.entity.Delivery;
import com.ecom.greengrove.repo.DeliveryRepo;
import com.ecom.greengrove.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    private DeliveryRepo deliveryRepo;

    @Override
    public String addDelivery(DeliveryDTO deliveryDTO) {
        Delivery delivery = new Delivery();
        delivery.setFullName(delivery.getFullName());
        delivery.setAddressLine1(delivery.getAddressLine1());
        delivery.setAddressLine2(delivery.getAddressLine2());
        delivery.setCity(delivery.getCity());
        delivery.setState(delivery.getState());
        delivery.setZipCode(delivery.getZipCode());
        delivery.setCountry(delivery.getCountry());
        delivery.setEmail(delivery.getEmail());
        delivery.setPhone(delivery.getPhone());


        deliveryRepo.save(delivery);
        return "Success";
    }

    @Override
    public String deleteDelivery(Long deliveryId) {
        if (deliveryRepo.existsById(deliveryId)) {
            deliveryRepo.deleteById(deliveryId);
            return "Delivery deleted successfully";
        } else {
            return "Delivery not found";
        }
    }


}