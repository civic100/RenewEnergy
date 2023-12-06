package com.renewEnergy.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.renewEnergy.Service.ProjectsService;
import com.renewEnergy.Model.Projects;
import com.renewEnergy.Model.ProjectsDTO;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectsController {
    @Autowired
	ProjectsService projectsService;


	@GetMapping()
	public List<Projects> getProjects() {
		return projectsService.findAllProjects();
	}
	@GetMapping("enable")
	public List<Projects> getEnableProjects() {
		return projectsService.findAllEnableProjects();
	}

	@GetMapping("{id}")
	public Optional<Projects> getProjectsById(@PathVariable Integer id) {
		return projectsService.findProjectsById(id);
	}
	@PostMapping()
    public void addProject(@RequestBody ProjectsDTO projectsDTO){
        projectsService.addProject(projectsDTO);
    }
	@PutMapping("{id}")
	public void putProject(@RequestBody ProjectsDTO projectsDTO,@PathVariable Integer id){
        projectsService.putProjects(projectsDTO, id);
    }

	@PatchMapping("{id}")
    public void patchProject(@PathVariable("id") Integer id) {
        projectsService.patchProject(id);
    }
}
