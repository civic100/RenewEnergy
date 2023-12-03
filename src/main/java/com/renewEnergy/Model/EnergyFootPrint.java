package com.renewEnergy.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Data
@RequiredArgsConstructor
@Table (name = "energyfootprint")
@Entity
public class EnergyFootPrint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_energyfootprint")
    private Integer id_energyfootprint;

    @ManyToOne
    @JoinColumn(name = "id_solarpanel")
    private SolarPanels solarPanel;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "id_project")
    private Projects project;

    @Column(name = "date")
    private LocalDate  date;

    @Column(name = "carbonfootprint")
    private Integer carbonfootprint;

    @Column(name = "generatedenergy")
    private Integer generatedenergy;

    @Column(name = "is_disabled")
    private Boolean is_disabled;

    public EnergyFootPrint(EnergyFootPrintDTO energyFootPrintDTO){
        this.id_energyfootprint = energyFootPrintDTO.getId_energyfootprint();
        this.solarPanel = energyFootPrintDTO.getSolarPanel();
        this.user = energyFootPrintDTO.getUser();
        this.project =energyFootPrintDTO.getProject();
        this.date = energyFootPrintDTO.getDate();
        this.carbonfootprint = energyFootPrintDTO.getCarbonfootprint();
        this.generatedenergy = energyFootPrintDTO.getGeneratedenergy();
        this.is_disabled = energyFootPrintDTO.getIs_disabled();
    }

}
