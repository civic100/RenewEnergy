package com.renewEnergy.DataBase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.renewEnergy.Model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer>{
    
}
