package com.macys.profile.service;

import com.macys.profile.domain.CreateAccountRequest;
import com.macys.profile.domain.UserProfile;

public interface ICreateAccountService {

	UserProfile saveCreateAccountInfo(CreateAccountRequest caRequest);
	
	UserProfile getUserByEmail(String userEmail);
}
