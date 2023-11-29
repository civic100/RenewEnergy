package com.renewEnergy.DataBase;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.Projects;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Integer>{

    @Query("SELECT p FROM Projects p WHERE p.is_disabled = true")
    List<Projects> findAllEnableProjects();
}
