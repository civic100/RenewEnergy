package com.renewEnergy.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.renewEnergy.DataBase.ProjectsRepository;
import com.renewEnergy.Model.Projects;
import com.renewEnergy.Model.ProjectsDTO;

@Service
public class ProjectsService {

	private final ProjectsRepository projectsRepository;

    public ProjectsService(ProjectsRepository projectsRepository) {
        this.projectsRepository = projectsRepository;
    }

    public List<Projects> findAllProjects() {
        return projectsRepository.findAll();
    }
    public List<Projects> findAllEnableProjects() {
        return projectsRepository.findAllEnableProjects();
    }

    public Optional<Projects> findProjectsById(Integer id) {
        Optional<Projects> project = projectsRepository.findById(id);
		return project;
    }
    
    public void addProject(ProjectsDTO projectsDTO) {
        Projects project = new Projects(projectsDTO);
        project.setIs_disabled(true);
        projectsRepository.save(project);
    }
    public void putProjects(ProjectsDTO projectsDTO, Integer id) {
        Projects projects = new Projects(projectsDTO);

        Projects projectsReal = findProjectsById(id).get();

        projectsReal.setDescription(projects.getDescription());
        projectsReal.setGeographic_area(projects.getGeographic_area());
        projectsReal.setCoordinates(projects.getCoordinates());
        projectsReal.setVillage_name(projects.getVillage_name());
        projectsReal.setImage_url(projects.getImage_url());

        projectsRepository.save(projectsReal);
    }

    public void patchProject(Integer id) {
        Projects project = findProjectsById(id).get();
        if (project.getIs_disabled()) {
            project.setIs_disabled(false);
        }else{
            project.setIs_disabled(true);
        }
        projectsRepository.save(project);
    }
}
