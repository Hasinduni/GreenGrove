package com.ecom.greengrove.service;

import com.ecom.greengrove.dto.requestDTO.DeliveryDTO;

public interface DeliveryService {

    String addDelivery(DeliveryDTO deliveryDTO);



    String deleteDelivery(Long deliveryId);
}
