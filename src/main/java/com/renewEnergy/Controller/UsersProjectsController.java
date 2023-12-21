package com.renewEnergy.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.renewEnergy.Model.UsersProjects;
import com.renewEnergy.Model.UsersProjects.UsersProjectId;
import com.renewEnergy.Service.UsersProjectsService;


@RestController
@RequestMapping("/usersprojects")
@CrossOrigin
public class UsersProjectsController {
    
    @Autowired
    private UsersProjectsService usersProjectsService;

    @GetMapping
    public List<UsersProjects> getAllUserProjects() {
        return usersProjectsService.getAllUsersProjects();
    }

    @GetMapping("/{userId}/{projectId}/{paymentId}")
    public UsersProjects getUserProjectById(@PathVariable Integer userId, @PathVariable Integer projectId, @PathVariable Integer paymentId) {
        UsersProjectId id = new UsersProjectId(userId, projectId, paymentId);
        return usersProjectsService.getUsersProjectsById(id);
    }

    @PostMapping
    public void saveUserProject(@RequestBody UsersProjectId usersProjectsId) {
        usersProjectsService.saveUserProject(usersProjectsId);
    }

    @GetMapping("/payment")
    public ResponseEntity<List<Object[]>> getPaymentByProject() {
        return usersProjectsService.getPaymentByProject();
    }
}