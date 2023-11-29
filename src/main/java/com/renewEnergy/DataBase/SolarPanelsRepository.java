package com.renewEnergy.DataBase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.SolarPanels;

@Repository
public interface SolarPanelsRepository extends JpaRepository<SolarPanels, Integer>{

    @Query("SELECT s FROM SolarPanels s WHERE s.is_disabled = true")
    List<SolarPanels> findAllEnableSolarPanels();

}
