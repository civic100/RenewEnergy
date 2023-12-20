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

        Map<String, Double> userProjectAmountMap = new HashMap<>();

        // Iterar sobre UsersProjects y ContributionPlans para calcular la suma del
        // amount
        for (UsersProjects usersProjects : up) {
            for (ContributionPlans contributionPlans : cp) {
                if (usersProjects.getContributionPlans().getId_contributionplan() == contributionPlans
                        .getId_contributionplan()) {

                    // Construir una clave única para identificar la contribución por usuario y
                    // proyecto
                    String key = usersProjects.getUser().getId_user() + "-"
                            + usersProjects.getProject().getId_project();

                    // Obtener la suma actual y agregar el nuevo amount
                    double currentSum = userProjectAmountMap.getOrDefault(key, 0.0);
                    double newAmount = usersProjects.getContributionPlans().getAmount();
                    userProjectAmountMap.put(key, currentSum + newAmount);
                }
            }
        }

        // Construir la lista de resultados a partir del mapa
        List<Object[]> result = new ArrayList<>();
        for (Map.Entry<String, Double> entry : userProjectAmountMap.entrySet()) {
            String[] keyParts = entry.getKey().split("-");
            Long userId = Long.parseLong(keyParts[0]);
            Long projectId = Long.parseLong(keyParts[1]);
            Double totalAmount = entry.getValue();

            Object[] row = new Object[] { userId, projectId, totalAmount };
            result.add(row);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);

    }
}
