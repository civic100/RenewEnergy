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
import com.renewEnergy.Model.SolarPanels;
import com.renewEnergy.Model.SolarPanelsDTO;
import com.renewEnergy.Service.SolarPanelsService;

@RestController
@RequestMapping("/solarpanels")
@CrossOrigin(origins = "http://localhost:5173")

public class SolarPanelsController {
    @Autowired
    SolarPanelsService solarPanelsService;

    @GetMapping()
    public List<SolarPanels> getSolarPanels(){
        return solarPanelsService.findAllSolarPanels();
    }
    
    @GetMapping("enable")
    public List<SolarPanels> getEnableSolarPanels() {
		return solarPanelsService.findAllEnableSolarPanels();
	}

    @GetMapping("{id}")
	public Optional<SolarPanels> getSolarPanelById(@PathVariable Integer id) {
		return solarPanelsService.findSolarPanelsById(id);
	}
	@PostMapping()
    public void addSolarPanel(@RequestBody SolarPanelsDTO solarPanelsDTO){
        solarPanelsService.addSolarPanels(solarPanelsDTO);
    }
	@PutMapping("{id}")
	public void putSolarPanel(@RequestBody SolarPanelsDTO solarPanelsDTO,@PathVariable Integer id){
        solarPanelsService.putSolarPanels(solarPanelsDTO, id);
    }

	@PatchMapping("{id}")
    public void patchSolarPanel(@PathVariable("id") Integer id) {
        solarPanelsService.patchSolarPanels(id);
    }
}
