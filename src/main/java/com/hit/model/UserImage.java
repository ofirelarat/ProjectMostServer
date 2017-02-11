package com.hit.model;

public class UserImage {

	private int id;
	private int userId;
	private String imageName;
		
	public UserImage() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserImage(int userId, String imageName) {
		super();
		this.userId = userId;
		this.imageName = imageName;
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

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
}
