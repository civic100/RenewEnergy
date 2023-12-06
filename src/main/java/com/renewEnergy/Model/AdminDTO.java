package com.renewEnergy.Model;

import lombok.Data;

@Data
public class AdminDTO {

    private Integer id_admin;
    private String password;

    public AdminDTO(Admin admin){
        this.id_admin = admin.getId_admin();
        this.password = admin.getPassword();
    }

    public AdminDTO(){
        
    }
}
