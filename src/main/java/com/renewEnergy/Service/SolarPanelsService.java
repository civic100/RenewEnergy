package com.renewEnergy.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.renewEnergy.DataBase.SolarPanelsRepository;
import com.renewEnergy.Model.SolarPanels;
import com.renewEnergy.Model.SolarPanelsDTO;

@Service
public class SolarPanelsService {
    
    private final SolarPanelsRepository solarPanelsRepository;

    public SolarPanelsService(SolarPanelsRepository solarPanelsRepository){
        this.solarPanelsRepository = solarPanelsRepository;
    }

    public List<SolarPanels> findAllSolarPanels() {
        return solarPanelsRepository.findAll();
    }

    public List<SolarPanels> findAllEnableSolarPanels() {
        return solarPanelsRepository.findAllEnableSolarPanels();
    }

    public Optional<SolarPanels> findSolarPanelsById(Integer id) {
        Optional<SolarPanels> solarPanel = solarPanelsRepository.findById(id);
		return solarPanel;
    }

    public void addSolarPanels(SolarPanelsDTO solarPanelsDTO) {
        SolarPanels solarPanels = new SolarPanels(solarPanelsDTO);
        solarPanels.setIs_disabled(true);
        solarPanelsRepository.save(solarPanels);
    }

    public void putSolarPanels(SolarPanelsDTO solarPanelsDTO, Integer id) {
        SolarPanels solarPanels = new SolarPanels(solarPanelsDTO);
        SolarPanels solarPanelsReal = findSolarPanelsById(id).get();

        solarPanelsReal.setModel(solarPanels.getModel());
        solarPanelsReal.setManufacturer(solarPanels.getManufacturer());
        solarPanelsReal.setNominalpower(solarPanels.getNominalpower());
        solarPanelsReal.setEfficiency(solarPanels.getEfficiency());
        solarPanelsReal.setCelltype(solarPanels.getCelltype());
        solarPanelsReal.setImage_url(solarPanels.getImage_url());

        solarPanelsRepository.save(solarPanels);
    }

    public void patchSolarPanels(Integer id) {
        SolarPanels solarPanels = findSolarPanelsById(id).get();
        if (solarPanels.getIs_disabled()) {
            solarPanels.setIs_disabled(false);
        }else{
            solarPanels.setIs_disabled(true);
        }
        solarPanelsRepository.save(solarPanels);
    }
}
