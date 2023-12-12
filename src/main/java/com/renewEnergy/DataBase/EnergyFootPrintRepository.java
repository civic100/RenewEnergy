package com.renewEnergy.DataBase;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.renewEnergy.Model.EnergyFootPrint;

@Repository
public interface EnergyFootPrintRepository extends JpaRepository<EnergyFootPrint, Integer> {

     @Query("SELECT e FROM EnergyFootPrint e WHERE e.is_disabled = true")
     List<EnergyFootPrint> findAllEnergyFootPrints();

     @Query("SELECT AVG(e.carbonfootprint) as avgCarbonFootprint, AVG(e.generatedenergy) as avgGeneratedEnergy " +
     "FROM EnergyFootPrint e WHERE e.user.id_user = :userId")
     Map<String, Double> getAverageFootprintAndEnergy(@Param("userId") Integer userId);

}
