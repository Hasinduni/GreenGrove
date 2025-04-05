package com.ecom.greengrove.service.Impl;

import com.ecom.greengrove.dto.OrderItemDto;
import com.ecom.greengrove.entity.Order;
import com.ecom.greengrove.entity.OrderItem;
import com.ecom.greengrove.entity.Product;
import com.ecom.greengrove.repo.OrderItemRepo;
import com.ecom.greengrove.repo.OrderRepo;
import com.ecom.greengrove.repo.ProductRepo;
import com.ecom.greengrove.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private OrderItemRepo orderItemRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private ProductRepo productRepo;


    public OrderItemServiceImpl(OrderItemRepo orderItemRepo, OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderItemRepo = orderItemRepo;
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    @Override
    public String addOrderItem(OrderItemDto orderItemDto) {
        Optional<Order> order = orderRepo.findById(orderItemDto.getOrder());
        Optional<Product> product = productRepo.findById(orderItemDto.getProduct());

        if (order.isEmpty() || product.isEmpty()) {
            throw new RuntimeException("Invalid order or product ID");
        }

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order.get());
        orderItem.setProduct(product.get());
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setUnitPrice(orderItemDto.getUnitPrice());

        orderItemRepo.save(orderItem);
        return "Order item added successfully";
    }

    @Override
    public String deleteOrderItem(Long orderItemId) {
        if (orderItemRepo.existsById(orderItemId)) {
            orderItemRepo.deleteById(orderItemId);
            return "Order item deleted successfully";
        } else {
            throw new RuntimeException("Order item not found with ID: " + orderItemId);
        }
    }

}
