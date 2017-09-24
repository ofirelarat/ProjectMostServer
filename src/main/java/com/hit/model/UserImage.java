package com.hit.model;

public class UserImage {

	private int id;
	private int userId;
	private String imageURL;
		
	public UserImage() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserImage(int userId, String imageURL) {
		super();
		this.userId = userId;
		this.imageURL = imageURL;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
}
