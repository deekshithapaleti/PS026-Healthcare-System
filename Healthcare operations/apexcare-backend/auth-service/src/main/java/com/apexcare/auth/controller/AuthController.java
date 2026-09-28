package com.apexcare.auth.controller;

import com.apexcare.auth.dto.LoginRequest;
import com.apexcare.auth.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // Demo credentials for project authentication
        if ("admin".equals(request.getUsername())
                && "admin123".equals(request.getPassword())) {

            String token = JwtUtil.generateToken(
                    request.getUsername()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "username", request.getUsername(),
                            "token", token
                    )
            );
        }

        return ResponseEntity
                .status(401)
                .body(Map.of(
                        "message", "Invalid username or password"
                ));
    }
}