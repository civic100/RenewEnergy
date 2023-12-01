package com.renewEnergy.Model;

import lombok.Data;

@Data
public class CompaniesDTO {
    
    private Integer id_company;
    private Users user;
    private String company_name;
    private String website; 
    private String image_url;
    private Boolean is_disabled;

    public CompaniesDTO(Companies companies){
        this.id_company = companies.getId_company();
        this.user = companies.getUser();
        this.company_name = companies.getCompany_name();
        this.website = companies.getWebsite();
        this. image_url = companies.getImage_url();
        this.is_disabled = companies.getIs_disabled();
    }

    public CompaniesDTO(){
    }
}
