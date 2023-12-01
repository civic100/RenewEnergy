package com.renewEnergy.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Table(name = "companies")
@Entity
public class Companies {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_company")
    private Integer id_company;

    @OneToOne
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private Users user;

    @Column(name = "company_name")
    private String company_name;

    @Column(name = "website")
    private String website; 

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "is_disabled")
    private Boolean is_disabled;

    public Companies(CompaniesDTO companiesDTO){
        this.id_company = companiesDTO.getId_company();
        this.user = companiesDTO.getUser();
        this.company_name = companiesDTO.getCompany_name();
        this.website = companiesDTO.getWebsite();
        this.image_url = companiesDTO.getImage_url();
        this.is_disabled = companiesDTO.getIs_disabled();
    }
}
