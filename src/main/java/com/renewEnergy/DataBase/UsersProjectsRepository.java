package com.renewEnergy.DataBase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.renewEnergy.Model.UsersProjects;
import com.renewEnergy.Model.UsersProjects.UsersProjectId;

@Repository
public interface UsersProjectsRepository extends JpaRepository<UsersProjects, UsersProjectId> {

}
