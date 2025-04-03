package com.ecom.greengrove.controller;

import com.ecom.greengrove.entity.Payment;
import com.ecom.greengrove.repo.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payhere")
@CrossOrigin("*") // Allow frontend access
public class PaymentController {

    private static final Logger logger = Logger.getLogger(PaymentController.class.getName());

    private final PaymentRepo transactionRepository;

    @Value("${payhere.merchant_id}")
    private String merchantId;

    @Value("${payhere.return_url}")
    private String returnUrl;

    @Value("${payhere.cancel_url}")
    private String cancelUrl;

    @Value("${payhere.notify_url}")
    private String notifyUrl;

    @Autowired
    public PaymentController(PaymentRepo transactionRepository) {
        this.transactionRepository = transactionRepository;
    }


    @PostMapping("/initiate-payment")
    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, String> paymentDetails) {
        try {
            String baseUrl = "https://sandbox.payhere.lk/pay/checkout";
            String orderId = UUID.randomUUID().toString(); // Unique Order ID


            Map<String, String> payload = new HashMap<>();
            payload.put("merchant_id", merchantId);
            payload.put("return_url", returnUrl);
            payload.put("cancel_url", cancelUrl);
            payload.put("notify_url", notifyUrl);
            payload.put("order_id", orderId);
            payload.put("items", paymentDetails.get("item"));
            payload.put("currency", "LKR"); // ✅ Always use "LKR" for Sri Lankan Rupees
            payload.put("amount", paymentDetails.get("amount"));


            String redirectUrl = baseUrl + "?" + payload.entrySet().stream()
                    .map(e -> e.getKey() + "=" + URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                    .collect(Collectors.joining("&"));

            logger.info("Payment Initiated: Order ID=" + orderId + ", Redirect URL=" + redirectUrl);

            return ResponseEntity.ok(Map.of(
                    "order_id", orderId,
                    "redirectUrl", redirectUrl
            ));
        } catch (Exception e) {
            logger.severe("Error initiating payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment initiation failed");
        }
    }


    @PostMapping(value = "/notify", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> handleNotification(
            @RequestParam("payment_id") String paymentId,
            @RequestParam("amount") String amount,
            @RequestParam("currency") String currency,
            @RequestParam("status_code") String statusCode) {

        try {
            logger.info(String.format("🔔 Payment Notification Received: Payment ID=%s, Amount=%s, Currency=%s, Status=%s",
                    paymentId, amount, currency, statusCode));


            Payment transaction = new Payment();
            transaction.setPaymentId(paymentId);
            transaction.setAmount(Double.parseDouble(amount));
            transaction.setCurrency(currency);
            transaction.setStatusCode(Integer.parseInt(statusCode));

            transactionRepository.save(transaction);

            return ResponseEntity.ok("Payment Verified");
        } catch (Exception e) {
            logger.severe("Error processing payment notification: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process payment notification");
        }
    }
}
