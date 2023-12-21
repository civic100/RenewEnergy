package com.renewEnergy.DataBase;

import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.ProjectSolarPanels;
import com.renewEnergy.Model.ProjectSolarPanels.ProjectSolarPanelId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProjectSolarPanelsRepository extends JpaRepository<ProjectSolarPanels, ProjectSolarPanelId> {
    
    @Query("SELECT ps FROM ProjectSolarPanels ps WHERE ps.id.projectId = :projectId")
    List<ProjectSolarPanels> findSolarPanelsByIdProject(@Param("projectId") Integer projectId);
}
