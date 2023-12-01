package com.renewEnergy.Model;

import lombok.Data;

@Data
public class ContributionPlansDTO {
    

    private Integer id_contributionplan;
    private String plan_name;
    private Float amount;
    private Frequency frequency;

    public ContributionPlansDTO(ContributionPlans contributionPlans){
        this.id_contributionplan = contributionPlans.getId_contributionplan();
        this.plan_name = contributionPlans.getPlan_name();
        this.amount = contributionPlans.getAmount();
        this.frequency = contributionPlans.getFrequency();
    }

    public ContributionPlansDTO(){
        
    }
}
