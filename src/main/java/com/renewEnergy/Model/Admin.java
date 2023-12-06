package com.renewEnergy.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Table(name = "admin")
@Entity
public class Admin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin")
    private Integer id_admin;

    @Column(name = "password")
    private String password;

    public Admin(AdminDTO adminDTO){
        this.id_admin = adminDTO.getId_admin();
        this.password = adminDTO.getPassword();
    }
}
