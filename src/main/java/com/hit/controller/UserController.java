package com.hit.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.Friends;
import com.hit.model.User;
import com.hit.model.User.Gender;
import com.hit.model.UserImage;


@RestController
@RequestMapping("/user")
public class UserController {

	private IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public String hello(){
		return "hello ";
	}
	
	@RequestMapping(value = "get/{name}", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody User getUser(@PathVariable String name)
	{
		return new User("kuku@gmail.com", "1234", name , name, 37, Gender.male);
	}
	
	
	@RequestMapping(value="/get" ,method = RequestMethod.POST)
	public User login(@RequestParam(value="email")String email ,@RequestParam(value="password")String password)
	{
		User user = null;
		try {
			user = DAO.FindUser(email, password);
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.login");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		return user;
	}
	
	@RequestMapping(value = "/{userId}",method = RequestMethod.GET)
	@ResponseBody
	public User search(@PathVariable int userId)
	{
		User user = null;
		try {
			user = DAO.FindUser(userId);
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.search");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}

		return user;
	}
	
	@RequestMapping(value="/put",method = RequestMethod.PUT)
	public HttpStatus register(@RequestParam(value="email")String email,@RequestParam(value="password")String password,@RequestParam(value="firstname")String firstname,@RequestParam(value="lastname")String lastname,@RequestParam(value="age")int age,@RequestParam(value="gender")Gender gender)
	{
		User user= new User(email,password,firstname,lastname,age,gender);
		try {
			if(DAO.AddUser(user))
			{
				return HttpStatus.OK;
			}else{
				return HttpStatus.CONFLICT;
			}
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.register");
			 logger.error(e.getMessage());
			e.printStackTrace();
			return HttpStatus.BAD_REQUEST;
		}
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	public HttpStatus delete(@RequestParam(value="id") int id)
	{
		try {
			DAO.DeleteUser(id);
			return HttpStatus.OK;
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.delete");
			 logger.error(e.getMessage());			
			 e.printStackTrace();
			return HttpStatus.BAD_REQUEST;
		}
	}
	
	@RequestMapping(value = "/all",method = RequestMethod.GET)
	public User[] getAllUsers()
	{	
		User[] users = null;
		try {
			users = DAO.GetAllUsers();
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.getAll");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		return users;
	}
	
	@RequestMapping(value="/{userId}/getfriends",method=RequestMethod.GET)
	public int[] getUserFriends(@PathVariable int userId){
		int[] friends = null;
		try {
			ArrayList<Integer> friendslist = DAO.getAllUserFriends(userId);
			friends = new int[friendslist.size()];
			for(int i=0, len = friendslist.size(); i < len; i++)
				   friends[i] = friendslist.get(i);
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.getFriends");
			 logger.error(e.getMessage());
			 e.printStackTrace();
		}
		return friends;
	}
	
	@RequestMapping(value="/{userId}/addfriend",method=RequestMethod.POST)
	public void addUserFriends(@PathVariable int userId,@RequestParam(value="friendId")int friendId){
		Friends friends = new Friends(userId, friendId);
		try {
			DAO.addFriendship(friends);
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.addFriend");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="{userId}/getimages",method=RequestMethod.GET)
	public @ResponseBody String[] getUserImages(@PathVariable int userId){
		String[] images = null;
		try {
			images = DAO.getUserImages(userId);
		} catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.getImages");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
		return images;
	}
	
	@RequestMapping(value="/deleteimage/{userID}",method=RequestMethod.DELETE)
	public void deleteUserImages(@PathVariable int userID,@RequestParam("imageURL") String url){
		try {
			 DAO.deleteUserImage(userID,url);
			 } catch (DAOException e) {
			 Logger logger = (Logger) LoggerFactory.getLogger("exception.userCotroller.addImage");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
	}
}
