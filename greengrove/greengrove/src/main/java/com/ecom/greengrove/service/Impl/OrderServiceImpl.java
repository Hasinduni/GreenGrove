package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.OrderDto;
import com.ecom.greengrove.entity.Customer;
import com.ecom.greengrove.entity.Order;
import com.ecom.greengrove.repo.CustomerRepo;
import com.ecom.greengrove.repo.OrderRepo;
import com.ecom.greengrove.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public String addOrder(OrderDto orderDto) {
        Customer customer = customerRepo.findById(orderDto.getCustomer())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Order order = new Order();
        order.setOrderDate(orderDto.getOrderDate());
        order.setOrderItems(orderDto.getOrderItems());
        order.setCustomer(customer);
        order.setTotalAmount(orderDto.getTotalAmount());
        order.setStatus(orderDto.getStatus());

        orderRepo.save(order);
        return "Order added successfully";
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
    public String updateOrder(Long orderId, OrderDto orderDto) {
        Optional<Order> existingOrder = orderRepo.findById(orderId);
        if (existingOrder.isPresent()) {
            Customer customer = customerRepo.findById(orderDto.getCustomer())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

            Order order = existingOrder.get();
            order.setOrderDate(orderDto.getOrderDate());
            order.setOrderItems(orderDto.getOrderItems());
            order.setCustomer(customer);
            order.setTotalAmount(orderDto.getTotalAmount());
            order.setStatus(orderDto.getStatus());

            orderRepo.save(order);
            return "Order updated successfully";
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }
    @Override
    public Order getOrderById(Long orderId) {
        return orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
    }
    @Override
    public List<Order> getOrdersByCustomerId(Long customerId) {
        // First verify customer exists
        if (!customerRepo.existsById(customerId)) {
            throw new RuntimeException("Customer not found with ID: " + customerId);
        }

        return orderRepo.findByCustomerId(customerId);
    }

}
