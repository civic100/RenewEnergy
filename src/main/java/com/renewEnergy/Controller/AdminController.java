package com.renewEnergy.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.renewEnergy.Model.AdminDTO;
import com.renewEnergy.Service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {
     @Autowired
    AdminService adminService;

     @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminDTO adminDTO) {
        // Implementa la lógica de autenticación aquí usando tu servicio
        boolean isAuthenticated = adminService.authenticateAdmin(adminDTO);

        if (isAuthenticated) {
            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}
