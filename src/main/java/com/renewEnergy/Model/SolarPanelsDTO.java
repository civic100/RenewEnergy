package com.renewEnergy.Model;

import lombok.Data;

@Data
public class SolarPanelsDTO {
    
    private Integer id_solarpanel;
    private String model;
    private String manufacturer;
    private Float nominalpower;
    private Float efficiency;
    private String celltype;
    private String image_url;
    private Boolean is_disabled;

    public SolarPanelsDTO(SolarPanels solarPanels){
        this.id_solarpanel = solarPanels.getId_solarpanel();
        this.model = solarPanels.getModel();
        this.manufacturer = solarPanels.getManufacturer();
        this.nominalpower = solarPanels.getNominalpower();
        this.efficiency = solarPanels.getEfficiency();
        this.celltype = solarPanels.getCelltype();
        this.image_url = solarPanels.getImage_url();
    }

    public SolarPanelsDTO(){
        
    }
}
