package com.renewEnergy.Model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class EnergyFootPrintDTO {

    private Integer id_energyfootprint;
    private Integer id_solarpanel;
    private Integer id_user;
    private Integer id_project;
    private LocalDate  date;
    private Integer carbonfootprint;
    private Integer generatedenergy;
    private Boolean is_disabled;

    public EnergyFootPrintDTO(EnergyFootPrint energyFootPrint){
        this.id_energyfootprint = energyFootPrint.getId_energyfootprint();
        this.id_solarpanel = energyFootPrint.getId_solarpanel();
        this.id_user = energyFootPrint.getId_user();
        this.id_project = energyFootPrint.getId_project();
        this.date = energyFootPrint.getDate();
        this.carbonfootprint = energyFootPrint.getCarbonfootprint();
        this.generatedenergy = energyFootPrint.getGeneratedenergy();
        this.is_disabled = energyFootPrint.getIs_disabled();
    }

    public EnergyFootPrintDTO(){

    }

}
