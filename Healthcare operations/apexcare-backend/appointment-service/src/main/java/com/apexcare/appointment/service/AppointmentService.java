package com.apexcare.appointment.service;

import com.apexcare.appointment.dto.BillingRequest;
import com.apexcare.appointment.entity.Appointment;
import com.apexcare.appointment.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final RestClient restClient;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            RestClient restClient) {

        this.appointmentRepository = appointmentRepository;
        this.restClient = restClient;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment createAppointment(Appointment appointment) {

        try {
            restClient.get()
                    .uri("http://localhost:8081/patients/" + appointment.getPatientId())
                    .retrieve()
                    .toBodilessEntity();

        } catch (Exception e) {
            throw new RuntimeException("Patient not found");
        }

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        restClient.post()
                .uri("http://localhost:8083/billing")
                .body(new BillingRequest(
                        savedAppointment.getPatientId(),
                        savedAppointment.getId(),
                        500.0,
                        0.0,
                        "Pending"
                ))
                .retrieve()
                .toBodilessEntity();

        return savedAppointment;
    }

    public Appointment updateAppointment(
            Long id,
            Appointment appointmentDetails) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found"));

        appointment.setPatientId(appointmentDetails.getPatientId());
        appointment.setDoctorName(appointmentDetails.getDoctorName());
        appointment.setAppointmentDate(
                appointmentDetails.getAppointmentDate());
        appointment.setAppointmentTime(
                appointmentDetails.getAppointmentTime());
        appointment.setDepartment(
                appointmentDetails.getDepartment());
        appointment.setStatus(
                appointmentDetails.getStatus());

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}