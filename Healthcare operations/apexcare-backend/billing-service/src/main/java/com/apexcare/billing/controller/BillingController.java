package com.apexcare.billing.controller;

import com.apexcare.billing.entity.Billing;
import com.apexcare.billing.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping
    public List<Billing> getAllBills() {
        return billingService.getAllBills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillById(@PathVariable Long id) {
        return billingService.getBillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Billing createBill(@RequestBody Billing billing) {
        return billingService.createBill(billing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Billing> updateBill(
            @PathVariable Long id,
            @RequestBody Billing billing) {

        try {
            return ResponseEntity.ok(
                    billingService.updateBill(id, billing)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        billingService.deleteBill(id);
        return ResponseEntity.noContent().build();
    }
}