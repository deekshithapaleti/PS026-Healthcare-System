package com.apexcare.billing.service;

import com.apexcare.billing.entity.Billing;
import com.apexcare.billing.repository.BillingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillingService {

    private final BillingRepository billingRepository;

    public BillingService(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    public Optional<Billing> getBillById(Long id) {
        return billingRepository.findById(id);
    }

    public Billing createBill(Billing billing) {
        billing.setTotalAmount(
                billing.getConsultationFee() + billing.getMedicineFee()
        );

        return billingRepository.save(billing);
    }

    public Billing updateBill(Long id, Billing billingDetails) {

        Billing billing = billingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        billing.setPatientId(billingDetails.getPatientId());
        billing.setAppointmentId(billingDetails.getAppointmentId());
        billing.setConsultationFee(billingDetails.getConsultationFee());
        billing.setMedicineFee(billingDetails.getMedicineFee());
        billing.setTotalAmount(
                billingDetails.getConsultationFee()
                        + billingDetails.getMedicineFee()
        );
        billing.setPaymentStatus(billingDetails.getPaymentStatus());

        return billingRepository.save(billing);
    }

    public void deleteBill(Long id) {
        billingRepository.deleteById(id);
    }
}