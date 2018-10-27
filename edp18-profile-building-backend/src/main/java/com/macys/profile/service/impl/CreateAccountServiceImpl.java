package com.macys.profile.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.macys.profile.dao.IProfileBuildingDao;
import com.macys.profile.domain.CreateAccountRequest;
import com.macys.profile.domain.UserProfile;
import com.macys.profile.service.ICreateAccountService;

@Service
public class CreateAccountServiceImpl implements ICreateAccountService {

	@Autowired
	private IProfileBuildingDao dao;
	
	@Override
	public UserProfile saveCreateAccountInfo(CreateAccountRequest caRequest) {
		return dao.saveCreateAccountInfo(caRequest);
	}

	@Override
	public UserProfile getUserByEmail(String userEmail) {
		return dao.getUserByEmail(userEmail);
	}
}
