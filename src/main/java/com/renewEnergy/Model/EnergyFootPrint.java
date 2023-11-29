package com.renewEnergy.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

@Data
@RequiredArgsConstructor
@Table (name = "energyfootprint")
@Entity
public class EnergyFootPrint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_energyfootprint")
    private Integer id_energyfootprint;

    @Column(name = "id_solarpanel")
    private Integer id_solarpanel;

    @Column(name = "id_user")
    private Integer id_user;

    @Column(name = "id_project")
    private Integer id_project;

    @Column(name = "date")
    private Integer date;

    @Column(name = "carbonfootprint")
    private Integer carbonfootprint;

    @Column(name = "generatedenergy")
    private Integer generatedenergy;

    @Column(name = "is_disabled")
    private Integer is_disabled;

    public EnergyFootPrint(EnergyFootPrintDTO energyFootPrintDTO){
        this.id_energyfootprint = energyFootPrintDTO.getId_energyfootprint();
        this.id_solarpanel = energyFootPrintDTO.getId_solarpanel();
        this.id_user = energyFootPrintDTO.getId_user();
        this.id_project = energyFootPrintDTO.getId_project();
        this.date = energyFootPrintDTO.getDate();
        this.carbonfootprint = energyFootPrintDTO.getCarbonfootprint();
        this.generatedenergy = energyFootPrintDTO.getGeneratedenergy();
        this.is_disabled = energyFootPrintDTO.getIs_disabled();
    }

}
