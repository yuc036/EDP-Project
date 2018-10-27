package com.macys.profile.domain;

import java.util.List;

public class CreateAccountRequest {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String dobMonth;
	private String dobDay;
	private List<Brand> preferredBrands;
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDobMonth() {
		return dobMonth;
	}

	public void setDobMonth(String dobMonth) {
		this.dobMonth = dobMonth;
	}

	public String getDobDay() {
		return dobDay;
	}

	public void setDobDay(String dobDay) {
		this.dobDay = dobDay;
	}

	public List<Brand> getPreferredBrands() {
		return preferredBrands;
	}

	public void setPreferredBrands(List<Brand> preferredBrands) {
		this.preferredBrands = preferredBrands;
	}
	
	public void printPreferredBrands() {
		if (preferredBrands != null) {
			for (Brand b : preferredBrands) {
				System.out.println(b.toString());
			}
		}
	}

	@Override
	public String toString() {
		printPreferredBrands();
		return "CreateAccountRequest [firstName=" + firstName + ", lastName=" + lastName
				+ ", email=" + email + ", password=" + password + ", dobMonth=" + dobMonth
				+ ", dobDay=" + dobDay + "]";
	}
}
