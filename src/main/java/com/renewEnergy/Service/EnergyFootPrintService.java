package com.renewEnergy.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.renewEnergy.DataBase.EnergyFootPrintRepository;
import com.renewEnergy.Model.EnergyFootPrint;
import com.renewEnergy.Model.EnergyFootPrintDTO;

@Service
public class EnergyFootPrintService {

    private final EnergyFootPrintRepository energyFootPrintRepository;

    public EnergyFootPrintService(EnergyFootPrintRepository energyFootPrintRepository){
        this.energyFootPrintRepository = energyFootPrintRepository;
    }

    public List<EnergyFootPrint> findAllEnergyFootPrints() {
        return  energyFootPrintRepository.findAll();
    }
    
    public List<EnergyFootPrint> findAllEnableEnergyFootPrints() {
        return  energyFootPrintRepository.findAllEnergyFootPrints();
    }

    public Optional<EnergyFootPrint> findEnergyFootPrintsById(Integer id) {
        Optional<EnergyFootPrint> energyFootPrint = energyFootPrintRepository.findById(id);
        return energyFootPrint;
    }

    public void addEnergyFootPrint(EnergyFootPrintDTO energyFootPrintDTO) {
    
        EnergyFootPrint energyFootPrint = new EnergyFootPrint(energyFootPrintDTO);
        energyFootPrint.setIs_disabled(true);
        energyFootPrintRepository.save(energyFootPrint);

    }

    public void putEnergyFootPrint(EnergyFootPrintDTO energyFootPrintDTO, Integer id) {

        EnergyFootPrint energyFootPrint = new EnergyFootPrint(energyFootPrintDTO);
        EnergyFootPrint energyFootPrintReal = findEnergyFootPrintsById(id).get();

        energyFootPrintReal.setId_solarpanel(energyFootPrint.getId_solarpanel());
        energyFootPrintReal.setId_user(energyFootPrint.getId_user());
        energyFootPrintReal.setId_project(energyFootPrint.getId_project());
        energyFootPrintReal.setDate(energyFootPrint.getDate());
        energyFootPrintReal.setCarbonfootprint(energyFootPrint.getCarbonfootprint());
        energyFootPrintReal.setGeneratedenergy(energyFootPrint.getGeneratedenergy());

        energyFootPrintRepository.save(energyFootPrintReal);
    }

    public void patchEnergyFootPrint(Integer id) {
        EnergyFootPrint energyFootPrint = findEnergyFootPrintsById(id).get();

        if (energyFootPrint.getIs_disabled()) {
            energyFootPrint.setIs_disabled(false);
        }else{
            energyFootPrint.setIs_disabled(true);
        }


    }

}