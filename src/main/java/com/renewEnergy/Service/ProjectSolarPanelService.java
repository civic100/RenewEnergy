package com.renewEnergy.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.renewEnergy.DataBase.ProjectSolarPanelsRepository;
import com.renewEnergy.Model.ProjectSolarPanels;
import com.renewEnergy.Model.ProjectSolarPanels.ProjectSolarPanelId;
import com.renewEnergy.Model.Projects;
import com.renewEnergy.Model.SolarPanels;

@Service
public class ProjectSolarPanelService {
    
    @Autowired
    private ProjectSolarPanelsRepository projectSolarPanelsRepository;
    @Autowired
    private ProjectsService projectsService;
    @Autowired
    private SolarPanelsService solarPanelsService;

    public List<ProjectSolarPanels> getAllProjectSolarPanels(){
        return projectSolarPanelsRepository.findAll();
    }

    public ProjectSolarPanels getProjectSolarPanelsById(ProjectSolarPanelId id){
        return projectSolarPanelsRepository.findById(id).orElse(null);
    }
    public void saveProjectSolarPanel(ProjectSolarPanelId projectSolarPanelId){
        Projects projects = projectsService.findProjectsById(projectSolarPanelId.getProjectId()).get();
        SolarPanels solarPanels = solarPanelsService.findSolarPanelsById(projectSolarPanelId.getSolarpanelId()).get();

        ProjectSolarPanels projectSolarPanels = new ProjectSolarPanels(projectSolarPanelId, projects,solarPanels );
        projectSolarPanelsRepository.save(projectSolarPanels);
    }
}
