package com.renewEnergy.DataBase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.ContributionPlans;

@Repository
public interface ContributionPlansRepository extends JpaRepository<ContributionPlans, Integer>{
    
}
