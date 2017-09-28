package com.hit.database;

import java.util.ArrayList;

import com.hit.exceptions.DAOException;
import com.hit.model.Friends;
import com.hit.model.ResultAnalysis;
import com.hit.model.User;
import com.hit.model.UserImage;

/**
 * 
 * @author ofir
 *
 */
public interface IMOSTDAO 
{
	//User table connection methods
	public boolean AddUser(User temp) throws DAOException;
	public boolean IsExist(String email) throws DAOException;
	public User FindUser(int id) throws DAOException;
	public User FindUser(String email,String password) throws DAOException;
	public User FindUserByEmail(String email) throws DAOException;
	public void EditUser(User temp) throws DAOException;
	public void DeleteUser(int id) throws DAOException;
	public void DeleteUser(User temp) throws DAOException;
	public User[] GetAllUsers() throws DAOException;

	public void addImage(String imageURL) throws DAOException;
	public String[] getUserImages(int userId) throws DAOException;
	public void deleteUserImage(int userId,String url) throws DAOException;

	
	//Result table connection methods
	public void AddResult(ResultAnalysis result) throws DAOException;
	public void AddResults(ResultAnalysis[] results) throws DAOException;
	public ResultAnalysis[] FindResults(int gameId,int userId) throws DAOException;
	public void DeleteResult(ResultAnalysis result) throws DAOException;
	public void DeleteResults(ResultAnalysis[] results) throws DAOException;
	
	//Friends table connection methods
	public boolean isFriendShipExist(int firstFriendId,int secondFriendId) throws DAOException;
	public void addFriendship(Friends friends) throws DAOException;
	public ArrayList<Integer> getAllUserFriends(int userId) throws DAOException;
}
