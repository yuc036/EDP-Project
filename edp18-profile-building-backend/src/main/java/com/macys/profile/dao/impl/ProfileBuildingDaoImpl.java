package com.macys.profile.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.macys.profile.dao.IProfileBuildingDao;
import com.macys.profile.domain.Brand;
import com.macys.profile.domain.CreateAccountRequest;
import com.macys.profile.domain.UserProfile;

@Repository
public class ProfileBuildingDaoImpl implements IProfileBuildingDao {

	private HashMap<String, UserProfile> userProfiles = new HashMap<>();
	
	// Create Account
	@Override
	public UserProfile saveCreateAccountInfo(CreateAccountRequest caRequest) {
		String fname = caRequest.getFirstName();
		String lname = caRequest.getLastName();
		String email = caRequest.getEmail();
		String password = caRequest.getPassword();
		String dobMonth = caRequest.getDobMonth();
		String dobDay = caRequest.getDobDay();
		List<Brand> brands = caRequest.getPreferredBrands();
		
		UserProfile user = new UserProfile(fname, lname, email, password,
				dobMonth, dobDay, brands);
		
		userProfiles.put(email, user);
		
		return user;
	}
	
	@Override
	public UserProfile getUserByEmail(String userEmail) {
		return userProfiles.get(userEmail); 
	}
	
	// Brand Page
	@Override
	public UserProfile createEDPAccount() {
		String fname = "EDP";
		String lname = "2018";
		String email = "edp@macys.com";
		String password = "123";
		String dobMonth = "02";
		String dobDay = "05";
		List<Brand> favBrands = new ArrayList<>();
		
		UserProfile edpProfile = new UserProfile(fname, lname, email, password, 
				dobMonth, dobDay, favBrands);
		
		userProfiles.put(email, edpProfile);
		
		return edpProfile;		
	}
	
	@Override
	public Brand addBrandToEDPAccount(Brand brand) {
		UserProfile edp = userProfiles.get("edp@macys.com");
		edp.getPreferredBrands().add(brand);
		userProfiles.put(edp.getEmail(), edp);
		
		return brand;
	}
}
