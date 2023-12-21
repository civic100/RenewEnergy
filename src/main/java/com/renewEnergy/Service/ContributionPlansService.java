package com.renewEnergy.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.renewEnergy.DataBase.ContributionPlansRepository;
import com.renewEnergy.Model.ContributionPlans;
import com.renewEnergy.Model.ContributionPlansDTO;

@Service
public class ContributionPlansService {

	private final ContributionPlansRepository payment;

	public ContributionPlansService(ContributionPlansRepository payment){
		this.payment = payment;
	}

    public List<ContributionPlans> findAllPayment() {
        return payment.findAll();
    }

	public Optional<ContributionPlans> findPaymentById(Integer id) {
		return payment.findById(id);
	}

	public ContributionPlans addPayment(ContributionPlansDTO contributionPlansDTO) {
		ContributionPlans savedContributionPlans = payment.save(new ContributionPlans(contributionPlansDTO));
		return savedContributionPlans;
	}

	public void putPayment(ContributionPlansDTO contributionPlansDTO, Integer id) {
		ContributionPlans contributionPlans = new ContributionPlans(contributionPlansDTO);
		ContributionPlans contributionPlansReal = findPaymentById(id).get();

		contributionPlansReal.setPlan_name(contributionPlans.getPlan_name());
		contributionPlansReal.setAmount(contributionPlans.getAmount());
		contributionPlansReal.setFrequency(contributionPlans.getFrequency());

		payment.save(contributionPlansReal);
	}
}