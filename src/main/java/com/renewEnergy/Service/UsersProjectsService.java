package com.renewEnergy.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.renewEnergy.DataBase.UsersProjectsRepository;
import com.renewEnergy.Model.ContributionPlans;
import com.renewEnergy.Model.Projects;
import com.renewEnergy.Model.Users;
import com.renewEnergy.Model.UsersProjects;
import com.renewEnergy.Model.UsersProjects.UsersProjectId;;

@Service
public class UsersProjectsService {

    @Autowired
    private UsersProjectsRepository usersProjectsRepository;
    @Autowired
    private UsersService usersService;
    @Autowired
    private ProjectsService projectsService;
    @Autowired
    private ContributionPlansService contributionPlansService;

    public List<UsersProjects> getAllUsersProjects() {
        return usersProjectsRepository.findAll();
    }

    public UsersProjects getUsersProjectsById(UsersProjectId id) {
        return usersProjectsRepository.findById(id).orElse(null);
    }

    public void saveUserProject(UsersProjectId userProjectId) {
        Users users = usersService.findUsersById(userProjectId.getUserId()).get();
        Projects projects = projectsService.findProjectsById(userProjectId.getProjectId()).get();
        ContributionPlans contributionPlans = contributionPlansService.findPaymentById(userProjectId.getPaymentId())
                .get();

        UsersProjects usersProjects = new UsersProjects(userProjectId, users, projects, contributionPlans);
        usersProjectsRepository.save(usersProjects);
    }

    public ResponseEntity<List<Object[]>> getPaymentByProject() {
        List<UsersProjects> up = getAllUsersProjects();
        List<ContributionPlans> cp = contributionPlansService.findAllPayment();


        for (ContributionPlans contributionPlans : cp) {
            System.out.println(contributionPlans.getId_contributionplan() + contributionPlans.getPlan_name() + contributionPlans.getAmount() + contributionPlans.getFrequency());
        }

        for (UsersProjects usersProjects : up) {
            System.out.println(usersProjects.getUser().getId_user() + usersProjects.getProject().getId_project() + usersProjects.getContributionPlans().getId_contributionplan());
        }

        List<Object[]> result = new ArrayList<>();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
