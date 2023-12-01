package com.renewEnergy.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Table(name = "contributionplans")
@Entity
public class ContributionPlans {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contributionplan")
    private Integer id_contributionplan;

    @Column(name = "plan_name")
    private String plan_name;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "frequency")
    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    public ContributionPlans(ContributionPlansDTO contributionPlansDTO){
        this.id_contributionplan = contributionPlansDTO.getId_contributionplan();
        this.plan_name = contributionPlansDTO.getPlan_name();
        this.amount = contributionPlansDTO.getAmount();
        this.frequency = contributionPlansDTO.getFrequency();
    }
}
