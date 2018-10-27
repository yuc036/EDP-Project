package com.macys.profile.service;

import com.macys.profile.domain.Brand;
import com.macys.profile.domain.UserProfile;

public interface IBrandPageService {

	UserProfile createEDPAccount();
	
	Brand addBrandToEDPAccount(Brand brand);
}
