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
@Table (name = "solarpanels")
@Entity
public class SolarPanels {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solarpanel")
    private Integer id_solarpanel;

    @Column(name = "model")
    private String model;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "nominalpower")
    private Float nominalpower;

    @Column(name = "efficiency")
    private Float efficiency;

    @Column(name = "celltype")
    private String celltype;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "is_disabled")
    private Boolean is_disabled;

    public SolarPanels(SolarPanelsDTO solarPanelsDTO){
        this.id_solarpanel = solarPanelsDTO.getId_solarpanel();
        this.model = solarPanelsDTO.getModel();
        this.manufacturer = solarPanelsDTO.getManufacturer();
        this.nominalpower = solarPanelsDTO.getNominalpower();
        this.efficiency = solarPanelsDTO.getEfficiency();
        this.celltype = solarPanelsDTO.getCelltype();
        this.image_url = solarPanelsDTO.getImage_url();
    }
}
