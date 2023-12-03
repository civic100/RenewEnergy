package com.renewEnergy.DataBase;

import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.ProjectSolarPanels;
import com.renewEnergy.Model.ProjectSolarPanels.ProjectSolarPanelId;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProjectSolarPanelsRepository extends JpaRepository<ProjectSolarPanels, ProjectSolarPanelId> {
    
}
