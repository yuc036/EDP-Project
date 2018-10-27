package com.macys.profile.dao;

import com.macys.profile.domain.Brand;
import com.macys.profile.domain.CreateAccountRequest;
import com.macys.profile.domain.UserProfile;

public interface IProfileBuildingDao {

	// Create Account
	UserProfile saveCreateAccountInfo(CreateAccountRequest caRequest);
	
	UserProfile getUserByEmail(String userEmail);
	
	// Brand Page
	UserProfile createEDPAccount();
	
	Brand addBrandToEDPAccount(Brand brand);
}
