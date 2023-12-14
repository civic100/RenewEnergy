package com.renewEnergy.Controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
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

import com.renewEnergy.Model.Companies;
import com.renewEnergy.Model.CompaniesDTO;
import com.renewEnergy.Model.EnergyFootPrint;
import com.renewEnergy.Model.UserType;
import com.renewEnergy.Model.Users;
import com.renewEnergy.Model.UsersDTO;
import com.renewEnergy.Service.CompaniesService;
import com.renewEnergy.Service.EnergyFootPrintService;
import com.renewEnergy.Service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    UsersService usersService;
    @Autowired
    CompaniesService companiesService;
    @Autowired
    EnergyFootPrintService energyFootPrintService;


    @GetMapping()
	public List<Users> getUsers() {
		return usersService.findAllUsers();
	}

    @GetMapping("{id}")
	public Optional<Users> getUsersById(@PathVariable Integer id) {
		return usersService.findUsersById(id);
	}

   @PostMapping()
    public ResponseEntity<String> addUsers(@RequestBody Map<String, String> requestBody) {
        try {
            // Extraer campos del mapa
            String companyName = requestBody.get("company_name");
            String email = requestBody.get("email");
            String imageUrl = requestBody.get("image_url");
            String name = requestBody.get("name");
            String password = requestBody.get("password");
            String userType = requestBody.get("user_type");
            String website = requestBody.get("website");

            UserType usersType = UserType.valueOf(userType.toLowerCase());

            // Crear instancias de UserDTO y CompanyDTO
            UsersDTO userDTO = new UsersDTO();
            userDTO.setEmail(email);
            userDTO.setName(name);
            userDTO.setPassword(password);
            userDTO.setUser_type(usersType);

            CompaniesDTO companyDTO = new CompaniesDTO();
            companyDTO.setCompany_name(companyName);
            companyDTO.setImage_url(imageUrl);
            companyDTO.setWebsite(website);

            // Verificar el correo electrónico
            if (usersService.authenticateEmail(userDTO).isPresent()) {
                throw new RuntimeException("El correo electrónico ya existe");
            }

            // Lógica para agregar usuario y compañía   
            usersService.addUsers(userDTO);
            // Lógica para agregar compañía
            Users user = usersService.authenticateEmail(userDTO).get();
            if(user != null){
                companyDTO.setUser(user);
                companiesService.addCompanie(companyDTO);
            }
            return ResponseEntity.ok("Usuario y compañía creados correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el usuario y la compañía: " + e.getMessage());
        }
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
    public ResponseEntity<?> login(@RequestBody UsersDTO usersDTO) {
        try {
            // Se llama al servicio para obtener un objeto Users basado en la información proporcionada en el UsersDTO.
            Users user = usersService.getUserId(usersDTO);
            // Se verifica si la autenticación fue exitosa comparando si el ID de usuario obtenido no es nulo.
            boolean isAuthenticated = user.getId_user() != null;
            // Si la autenticación es exitosa:
            if (isAuthenticated) {
                // Se obtienen las empresas asociadas al usuario.
                List<Companies> companies = companiesService.findComapniesByUserId(user.getId_user());
                // Si hay empresas asociadas, se devuelve una respuesta con la lista de empresas.
                if (!companies.isEmpty()) {
                    return ResponseEntity.ok(companies);
                } else {
                    // Si no hay empresas asociadas, se devuelve una respuesta con la información del usuario.
                    return ResponseEntity.ok(user);
                }
            }
        } catch (NoSuchElementException e) {
            // Si la autenticación falla, se devuelve una respuesta de error 401 (UNAUTHORIZED) con un mensaje indicando credenciales inválidas.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
        return null;
    }

    @GetMapping("/avgenergy/{userId}")
    public ResponseEntity<?> getAverageFootprintAndEnergy(@PathVariable Integer userId) {
        try {
            Map<String, Double> averages = energyFootPrintService.getAverageFootprintAndEnergyForUser(userId);
            return ResponseEntity.ok(averages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/sumenergy/{userId}")
    public ResponseEntity<?> getSumEnergy(@PathVariable Integer userId) {
       try {
            Map<String, Double> averages = energyFootPrintService.getSumEnergyUser(userId);
            return ResponseEntity.ok(averages);
       }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
       }
    }
    
    @GetMapping("/energyfootprints/{userId}")
        public ResponseEntity<?> getAllEnergyFootprintsForUser(@PathVariable Integer userId) {
        try {
            List<EnergyFootPrint> energyFootprints = energyFootPrintService.getAllEnergyFootprintsForUser(userId);
            return ResponseEntity.ok(energyFootprints);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}   
