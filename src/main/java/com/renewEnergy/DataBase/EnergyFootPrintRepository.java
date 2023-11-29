package com.renewEnergy.DataBase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.renewEnergy.Model.EnergyFootPrint;

@Repository
public interface EnergyFootPrintRepository extends JpaRepository<EnergyFootPrint, Integer> {


     //Realizar consultas:
}
