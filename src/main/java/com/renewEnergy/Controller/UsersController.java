package com.renewEnergy.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.renewEnergy.Model.Users;
import com.renewEnergy.Model.UsersDTO;
import com.renewEnergy.Service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    UsersService usersService;

    @GetMapping()
	public List<Users> getUsers() {
		return usersService.findAllUsers();
	}

    @GetMapping("{id}")
	public Optional<Users> getUsersById(@PathVariable Integer id) {
		return usersService.findUsersById(id);
	}
    @PostMapping()
    public void addUsers(@RequestBody UsersDTO usersDTO){
        usersService.addUsers(usersDTO);
    }
	@PutMapping("{id}")
	public void putUsers(@RequestBody UsersDTO usersDTO,@PathVariable Integer id){
        usersService.putUsers(usersDTO, id);
    }

	@PatchMapping("{id}")
    public void patchUsers(@PathVariable("id") Integer id) {
        usersService.patchUsers(id);
    }

    //Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsersDTO usersDTO) {
        boolean isAuthenticated = usersService.authenticateUser(usersDTO);

        if (isAuthenticated) {
            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }


}
