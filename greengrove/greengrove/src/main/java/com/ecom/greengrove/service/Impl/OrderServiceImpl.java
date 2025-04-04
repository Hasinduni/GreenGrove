package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.OrderDto;
import com.ecom.greengrove.entity.Order;
import com.ecom.greengrove.repo.OrderRepo;
import com.ecom.greengrove.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
  private   OrderRepo orderRepo;

    @Override
    public String addOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setOrderDate(orderDto.getOrderDate());
        order.setOrderItems(orderDto.getOrderItems());
        order.setCustomer(orderDto.getCustomer());
        order.setTotalAmount(orderDto.getTotalAmount());
        orderRepo.save(order);
        return ("order added successfully");
    }
    @Override
    public String deleteOrder(Long orderId) {
        if (orderRepo.existsById(orderId)) {
            orderRepo.deleteById(orderId);
            return "Order deleted successfully";
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    @Override
    public List<OrderDto> getOrdersByCustomerId(Long customerId) {
        Optional<Order> orders = orderRepo.findById(customerId);
        return orders.stream()
                .map(order -> new OrderDto(
                        order.getId(),
                        order.getOrderDate(),
                        order.getOrderItems(),
                        order.getCustomer(),
                        order.getTotalAmount()
                ))
                .collect(Collectors.toList());
    }
    @Override
    public String updateOrder(Long orderId, OrderDto orderDto) {
        Optional<Order> existingOrder = orderRepo.findById(orderId);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setOrderDate(orderDto.getOrderDate());
            order.setOrderItems(orderDto.getOrderItems());
            order.setCustomer(orderDto.getCustomer());
            order.setTotalAmount(orderDto.getTotalAmount());

            orderRepo.save(order);
            return "Order updated successfully";
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }


    @Override
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        return new OrderDto(
                order.getId(),
                order.getOrderDate(),
                order.getOrderItems(),
                order.getCustomer(),
                order.getTotalAmount()
        );
    }

}
