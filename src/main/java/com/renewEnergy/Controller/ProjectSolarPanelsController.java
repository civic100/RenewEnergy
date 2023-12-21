package com.renewEnergy.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.renewEnergy.Model.ProjectSolarPanels;
import com.renewEnergy.Model.ProjectSolarPanels.ProjectSolarPanelId;
import com.renewEnergy.Service.ProjectSolarPanelService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("projectsolarpanels")
@CrossOrigin
public class ProjectSolarPanelsController {

    @Autowired
    private ProjectSolarPanelService projectSolarPanelService;

    @GetMapping
    public List<ProjectSolarPanels> getAllProjectSolarPanels(){
        return projectSolarPanelService.getAllProjectSolarPanels();
    }

    @GetMapping("{projectId}/{solarpanelId}")
    public ProjectSolarPanels getProjectSolarPanelsById(@PathVariable Integer projectId, @PathVariable Integer solarpanelId){
        ProjectSolarPanelId id = new ProjectSolarPanelId(projectId,solarpanelId);
        return projectSolarPanelService.getProjectSolarPanelsById(id);
    }

    @GetMapping("/{projectId}")
    public List<ProjectSolarPanels> getProjectSolarPanelsByIdProject(@PathVariable Integer projectId){
        return projectSolarPanelService.obtenerProjectSolarPanelsPorIdProyecto(projectId);
    }

    @PostMapping()
    public void saveProjectSolarPanel(@RequestBody ProjectSolarPanelId projectSolarPanelId) {
        projectSolarPanelService.saveProjectSolarPanel(projectSolarPanelId);
    }
    
}