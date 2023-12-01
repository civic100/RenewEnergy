package com.renewEnergy.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.renewEnergy.Model.Companies;
import com.renewEnergy.Model.CompaniesDTO;
import com.renewEnergy.Service.CompaniesService;

@RestController
@RequestMapping("/companies")
public class CompaniesController {
    @Autowired
    CompaniesService companiesService;

    @GetMapping()
    public List<Companies> getCompanies(){
        return companiesService.findAllCompanies();
    }

    @GetMapping("enable")
    public List<Companies> getEnableCompanies(){
        return companiesService.findAllEnableCompanies();
    }
    
    @GetMapping("{id}")
    public Optional<Companies> getCompaniesById(@PathVariable Integer id){
        return companiesService.findComapniesById(id);
    }

    @PostMapping()
    public void addCompanie(@RequestBody CompaniesDTO companiesDTO){
        companiesService.addCompanie(companiesDTO);
    }

    @PutMapping("{id}")
    public void putCompanie(@RequestBody CompaniesDTO companiesDTO,@PathVariable Integer id){
        companiesService.putCompanie(companiesDTO, id);
    }

    @PutMapping("{id}")
    public void patchCompanie(@PathVariable("id") Integer id){
        companiesService.patchCompanie(id);
    }

}
