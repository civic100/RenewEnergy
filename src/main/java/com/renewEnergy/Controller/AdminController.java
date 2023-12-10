package com.renewEnergy.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.renewEnergy.Model.AdminDTO;
import com.renewEnergy.Service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
     @Autowired
    AdminService adminService;

     @PostMapping("/login")
    public boolean login(@RequestBody AdminDTO adminDTO) {
        // Implementa la lógica de autenticación aquí usando tu servicio
        boolean isAuthenticated = adminService.authenticateAdmin(adminDTO);

        if (isAuthenticated) {
            return true;
        } else {
            return false;
        }
    }
}
