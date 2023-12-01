package com.renewEnergy.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Table(name = "users")
@Entity
public class Users {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
    private Integer id_user;

    @Column(name = "name")
    private String name;
    
	@Column(name = "email")
    private String email;
    
	@Column(name = "password")
    private String password;
    
	@Column(name = "user_type")
    @Enumerated(EnumType.STRING)
    private UserType user_type;
    
	@Column(name = "image_url")
    private String image_url;

	@Column(name = "is_disabled")
    private Boolean is_disabled;

    public Users(UsersDTO usersDTO){
        this.id_user = usersDTO.getId_user();
        this.name = usersDTO.getName();
        this.email = usersDTO.getEmail();
        this.password = usersDTO.getPassword();
        this.user_type = usersDTO.getUser_type();
        this.image_url = usersDTO.getImage_url();
    }
}