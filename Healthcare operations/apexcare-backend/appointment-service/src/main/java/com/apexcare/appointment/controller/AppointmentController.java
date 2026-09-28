package com.apexcare.appointment.controller;

import com.apexcare.appointment.entity.Appointment;
import com.apexcare.appointment.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

  @PostMapping
public ResponseEntity<?> createAppointment(
        @RequestBody Appointment appointment) {

    try {
        return ResponseEntity.ok(
                appointmentService.createAppointment(appointment)
        );
    } catch (RuntimeException e) {
        return ResponseEntity
                .status(404)
                .body("Patient not found");
    }
}

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        try {
            return ResponseEntity.ok(
                    appointmentService.updateAppointment(id, appointment)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}