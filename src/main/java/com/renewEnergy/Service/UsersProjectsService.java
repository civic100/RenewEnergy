package com.renewEnergy.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
        ContributionPlans contributionPlans = contributionPlansService.findPaymentById(userProjectId.getPaymentId()).get();

        UsersProjects usersProjects = new UsersProjects(userProjectId, users, projects, contributionPlans);
        usersProjectsRepository.save(usersProjects);
    }
}
