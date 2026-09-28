package com.apexcare.appointment.dto;

public class BillingRequest {

    private Long patientId;
    private Long appointmentId;
    private Double consultationFee;
    private Double medicineFee;
    private String paymentStatus;

    public BillingRequest(
            Long patientId,
            Long appointmentId,
            Double consultationFee,
            Double medicineFee,
            String paymentStatus) {

        this.patientId = patientId;
        this.appointmentId = appointmentId;
        this.consultationFee = consultationFee;
        this.medicineFee = medicineFee;
        this.paymentStatus = paymentStatus;
    }

    public Long getPatientId() {
        return patientId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public Double getConsultationFee() {
        return consultationFee;
    }

    public Double getMedicineFee() {
        return medicineFee;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }
}