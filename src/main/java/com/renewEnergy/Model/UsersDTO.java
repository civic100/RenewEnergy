package com.renewEnergy.Model;

import lombok.Data;

@Data
public class UsersDTO {

    private Integer id_user;
    private String name;
    private String email;
    private String password;
    private UserType user_type;
    private String image_url;

    public UsersDTO(Users users){
        this.id_user = users.getId_user();
        this.name = users.getName();
        this.email = users.getEmail();
        this.password = users.getPassword();
        this.user_type = users.getUser_type();
        this.image_url = users.getImage_url();
    }

    public UsersDTO(){
        
    }
}