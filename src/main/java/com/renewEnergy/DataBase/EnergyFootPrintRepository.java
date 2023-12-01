package com.renewEnergy.DataBase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.renewEnergy.Model.EnergyFootPrint;

@Repository
public interface EnergyFootPrintRepository extends JpaRepository<EnergyFootPrint, Integer> {

     @Query("SELECT e FROM EnergyFootPrint e WHERE e.is_disabled = true")
     List<EnergyFootPrint> findAllEnergyFootPrints();

}
