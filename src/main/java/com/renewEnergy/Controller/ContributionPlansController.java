package com.renewEnergy.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.renewEnergy.Model.ContributionPlans;
import com.renewEnergy.Model.ContributionPlansDTO;
import com.renewEnergy.Service.ContributionPlansService;


@RestController
@RequestMapping("/payment")
@CrossOrigin
public class ContributionPlansController {
    @Autowired
    ContributionPlansService contributionPlansService;

    @GetMapping()
	public List<ContributionPlans> getPayment() {
		return contributionPlansService.findAllPayment();
	}

    @GetMapping("{id}")
	public Optional<ContributionPlans> getPaymentById(@PathVariable Integer id) {
		return contributionPlansService.findPaymentById(id);
	}
    @PostMapping()
    public ResponseEntity<Integer> addPayment(@RequestBody ContributionPlansDTO contributionPlansDTO) {
    ContributionPlans savedContributionPlans = contributionPlansService.addPayment(contributionPlansDTO);
    return new ResponseEntity<>(savedContributionPlans.getId_contributionplan(), HttpStatus.CREATED);
}
	@PutMapping("{id}")
	public void putPayment(@RequestBody ContributionPlansDTO contributionPlansDTO,@PathVariable Integer id){
        contributionPlansService.putPayment(contributionPlansDTO, id);
    }    
}
