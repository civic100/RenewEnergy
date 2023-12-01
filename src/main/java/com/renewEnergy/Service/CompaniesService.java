package com.renewEnergy.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.renewEnergy.Model.Companies;
import com.renewEnergy.Model.CompaniesDTO;
import com.renewEnergy.DataBase.CompaniesRepository;


@Service
public class CompaniesService {

    private final CompaniesRepository companiesRepository;

    public CompaniesService(CompaniesRepository companiesRepository){
        this.companiesRepository = companiesRepository;
    }
    
    public List<Companies> findAllCompanies() {
        return companiesRepository.findAll();
    }

    public List<Companies> findAllEnableCompanies() {
        return companiesRepository.findAllEnableCompanies();
    }

    public Optional<Companies> findComapniesById(Integer id) {
        Optional<Companies> project = companiesRepository.findById(id);
		return project;
    }

    public void addCompanie(CompaniesDTO companiesDTO) {
        Companies companies = new Companies(companiesDTO);
        companies.setIs_disabled(true);
        companiesRepository.save(companies);
    }

    public void putCompanie(CompaniesDTO companiesDTO, Integer id) {
        Companies companies = new Companies(companiesDTO);
        Companies companiesReal = findComapniesById(id).get();

        companiesReal.setUser(companies.getUser());
        companiesReal.setCompany_name(companies.getCompany_name());
        companiesReal.setImage_url(companies.getCompany_name());
        companiesReal.setWebsite(companies.getWebsite());
    
        companiesRepository.save(companiesReal);
    }

    public void patchCompanie(Integer id) {
        Companies companies = findComapniesById(id).get();
        if (companies.getIs_disabled()) {
            companies.setIs_disabled(false);
        }else{
            companies.setIs_disabled(false);
        }
        companiesRepository.save(companies);
    }
    
}
