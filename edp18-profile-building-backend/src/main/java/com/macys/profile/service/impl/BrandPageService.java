package com.macys.profile.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.macys.profile.dao.IProfileBuildingDao;
import com.macys.profile.domain.Brand;
import com.macys.profile.domain.UserProfile;
import com.macys.profile.service.IBrandPageService;

@Service
public class BrandPageService implements IBrandPageService {

	@Autowired
	private IProfileBuildingDao dao;
	
	@Override
	public UserProfile createEDPAccount() {
		return dao.createEDPAccount();
	}
	
	@Override
	public Brand addBrandToEDPAccount(Brand brand) {
		return dao.addBrandToEDPAccount(brand);
	}
}
