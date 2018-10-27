package com.macys.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.macys.profile.domain.Brand;
import com.macys.profile.domain.CreateAccountRequest;
import com.macys.profile.domain.UserProfile;
import com.macys.profile.service.IBrandPageService;
import com.macys.profile.service.ICreateAccountService;

@RestController
@RequestMapping("/profileBuilding")
public class ProfileRestController {
	
	@Autowired
	ICreateAccountService caService;
	
	@Autowired
	IBrandPageService bpService;

	@RequestMapping(path = "/test", method = RequestMethod.GET)
	public String test() {
		return "This was a test";
	}
	
	@RequestMapping(path = "/createAccount", method = RequestMethod.POST)
	public UserProfile saveCustomerInfo(@RequestBody CreateAccountRequest caRequest) {
		return caService.saveCreateAccountInfo(caRequest);
	}
	
	@RequestMapping(path = "/createAccount/{userEmail}", method = RequestMethod.GET)
	public UserProfile getCreateAccountInfo(@PathVariable String userEmail) {
		return caService.getUserByEmail(userEmail);
	}
	
	@RequestMapping(path = "/brandPage", method = RequestMethod.POST)
	public Brand addBrandToAccount(@RequestBody Brand brand) {
		return bpService.addBrandToEDPAccount(brand);
	}
	
	@RequestMapping(path = "/brandPage/edpProf", method = RequestMethod.GET) 
	public UserProfile createEDPAccount() {
		return bpService.createEDPAccount();
	}
}
