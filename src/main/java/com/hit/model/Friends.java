package com.hit.model;

public class Friends {

	private int id;
	private int firstUserId;
	private int secondUserId;
	
	public Friends() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Friends(int firstUserId, int secondUserId) {
		super();
		this.firstUserId = firstUserId;
		this.secondUserId = secondUserId;
	}

	public int getId(){
		return id;	
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public int getFirstUserId() {
		return firstUserId;
	}

	public void setFirstUserId(int firstUserId) {
		this.firstUserId = firstUserId;
	}

	public int getSecondUserId() {
		return secondUserId;
	}

	public void setSecondUserId(int secondUserId) {
		this.secondUserId = secondUserId;
	}
}
