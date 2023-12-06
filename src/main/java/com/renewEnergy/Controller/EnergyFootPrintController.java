package com.renewEnergy.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.renewEnergy.Model.EnergyFootPrint;
import com.renewEnergy.Model.EnergyFootPrintDTO;
import com.renewEnergy.Service.EnergyFootPrintService;

@RestController
@RequestMapping("/energyfootprint")
@CrossOrigin(origins = "http://localhost:5173")
public class EnergyFootPrintController {
    @Autowired
    EnergyFootPrintService energyFootPrintService;

    @GetMapping()
    public List<EnergyFootPrint> getEnergyFootPrints(){
        return energyFootPrintService.findAllEnergyFootPrints();
    }

    @GetMapping("enable")
    public List<EnergyFootPrint> getEnableEnergyFootPrints(){
        return energyFootPrintService.findAllEnableEnergyFootPrints();
    }

    @GetMapping("{id}")
    public Optional<EnergyFootPrint> getEnergyFootPrintsById(@PathVariable Integer id){
        return energyFootPrintService.findEnergyFootPrintsById(id);
    }

    @PostMapping()
    public void addEnergyFootPrint(@RequestBody EnergyFootPrintDTO energyFootPrintDTO){
        energyFootPrintService.addEnergyFootPrint(energyFootPrintDTO);
    }

    @PutMapping("{id}")
    public void putEnergyFootPrint(@RequestBody EnergyFootPrintDTO energyFootPrintDTO, @PathVariable Integer id){
        energyFootPrintService.putEnergyFootPrint(energyFootPrintDTO, id);
    }

    @PatchMapping("{id}")
    public void patchEnergyFootPrint(@PathVariable("id")Integer id){
        energyFootPrintService.patchEnergyFootPrint(id);
    }
}
