package com.hit.model;

/**
 * 
 * @author ofir
 *
 */
public class User
{
	private int id;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private int age;
	private String imagesUrls;
	
	public enum Gender
	{
		male,
		female
	}

	public User()
	{
		
	}
	
	public User(String email, String password, String firstName, String lastName, int age) {
		super();
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.imagesUrls = imagesUrls;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	public String getImagesUrls() {
		return imagesUrls;
	}

	public void setImagesUrls(String imagesUrls) {
		this.imagesUrls = imagesUrls;
	}

	public void addImageUrl(String url){
		if(this.imagesUrls != null && this.imagesUrls.length() > 0){
			this.imagesUrls = this.imagesUrls + "$" + url;
		}
		else{
			this.imagesUrls = url;
		}
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", age=" + age + "]";
	}
}
