package com.renewEnergy.DataBase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.Companies;

@Repository
public interface CompaniesRepository extends JpaRepository<Companies,Integer>{

    @Query("SELECT c FROM Companies c WHERE c.is_disabled = true")
    List<Companies> findAllEnableCompanies();

    
}