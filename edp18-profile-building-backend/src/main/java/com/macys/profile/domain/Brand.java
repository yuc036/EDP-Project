package com.macys.profile.domain;

public class Brand {

	private boolean onSale;
	private String picture;
	private String title;
	private String _id;
	
	public boolean isOnSale() {
		return onSale;
	}
	
	public void setOnSale(boolean onSale) {
		this.onSale = onSale;
	}
	
	public String getPicture() {
		return picture;
	}
	
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String get_id() {
		return _id;
	}
	
	public void set_id(String _id) {
		this._id = _id;
	}

	@Override
	public String toString() {
		return "Brand [onSale=" + onSale + ", picture=" + picture + ", title=" + title + ", _id="
				+ _id + "]";
	}
}
