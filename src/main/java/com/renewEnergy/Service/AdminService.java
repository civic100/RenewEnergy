package com.renewEnergy.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import com.renewEnergy.DataBase.AdminRepository;
import com.renewEnergy.Model.Admin;
import com.renewEnergy.Model.AdminDTO;


@Service
public class AdminService {
     private final AdminRepository adminRepository;

      public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    
    public boolean authenticateAdmin(AdminDTO adminDTO) {
        Optional<Admin> admin = adminRepository.findByPassword(adminDTO.getPassword());

        return admin.isPresent();
    }
}
