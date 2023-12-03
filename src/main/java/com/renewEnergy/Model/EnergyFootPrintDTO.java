package com.renewEnergy.Model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class EnergyFootPrintDTO {

    private Integer id_energyfootprint;
    private SolarPanels solarPanel;
    private Users user;
    private Projects project;
    private LocalDate  date;
    private Integer carbonfootprint;
    private Integer generatedenergy;
    private Boolean is_disabled;

    public EnergyFootPrintDTO(EnergyFootPrint energyFootPrint){
        this.id_energyfootprint = energyFootPrint.getId_energyfootprint();
        this.solarPanel = energyFootPrint.getSolarPanel();
        this.user = energyFootPrint.getUser();
        this.project = energyFootPrint.getProject();
        this.date = energyFootPrint.getDate();
        this.carbonfootprint = energyFootPrint.getCarbonfootprint();
        this.generatedenergy = energyFootPrint.getGeneratedenergy();
        this.is_disabled = energyFootPrint.getIs_disabled();
    }

    public EnergyFootPrintDTO(){

    }

}
