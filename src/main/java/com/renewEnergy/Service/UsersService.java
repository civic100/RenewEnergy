package com.renewEnergy.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.renewEnergy.DataBase.UsersRepository;
import com.renewEnergy.Model.Users;
import com.renewEnergy.Model.UsersDTO;


@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> findAllUsers() {
        return usersRepository.findAll();
    }

	public Optional<Users> findUsersById(Integer id) {
		return usersRepository.findById(id);
	}

	public void addUsers(UsersDTO usersDTO) {
        Users users = new Users(usersDTO);
        users.setIs_disabled(true);
        usersRepository.save(users);
	}

	public void putUsers(UsersDTO usersDTO, Integer id) {
        Users users = new Users(usersDTO);
        Users usersReal = findUsersById(id).get();

        usersReal.setName(users.getName());
        usersReal.setEmail(users.getEmail());
        usersReal.setPassword(users.getPassword());
        usersReal.setUser_type(users.getUser_type());
        usersReal.setImage_url(users.getImage_url());

        usersRepository.save(usersReal);
	}

	public void patchUsers(Integer id) {
        Users users = findUsersById(id).get();

        if (users.getIs_disabled()) {
            users.setIs_disabled(false);
        }else{
            users.setIs_disabled(true);
        }
        usersRepository.save(users);
	}

    //Login User
    public  Optional<Users> authenticateUser(UsersDTO usersDTO) {
        Optional<Users> user = usersRepository.findByEmailAndPassword(usersDTO.getEmail(), usersDTO.getPassword());
        return user;
    }
    //Recuperar ID
    public Users getUserId(UsersDTO usersDTO) {
        Optional<Users> user = authenticateUser(usersDTO);

        // Log de depuración
        System.out.println("User Optional: " + user);

        // Verifica si el Optional tiene un valor presente
        if (user.isPresent()) {
            return user.get();
        } else {
            // Maneja el caso en el que el usuario no se encuentra
            throw new NoSuchElementException("El usuario no se encuentra");
        }
    }


    public Optional<Users> authenticateEmail(UsersDTO usersDTO) {
        Optional<Users> user = usersRepository.findByEmail(usersDTO.getEmail());
        return user;
    }


}
