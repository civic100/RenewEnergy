package com.renewEnergy.DataBase;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{
    Optional<Admin> findByPassword(String password);
}
