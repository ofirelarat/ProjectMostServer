package com.hit.database;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.hit.exceptions.DAOException;
import com.hit.model.Friends;
import com.hit.model.ResultAnalysis;
import com.hit.model.User;
import com.hit.model.UserImage;

/**
 * 
 * @author ofir
 * 
 *This is singleton class that implement IMOSTDAO.
 */
public class HibernateMOSTDAO implements IMOSTDAO {

	private static SessionFactory factory;
	private static HibernateMOSTDAO instance = new HibernateMOSTDAO();
	
	public HibernateMOSTDAO()
	{
		try{
			Configuration configuration = new Configuration();
			configuration.configure();
			factory = configuration.buildSessionFactory();
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
	}
	
	public static HibernateMOSTDAO getInstance() 
	{
		return instance;
	}

	public boolean AddUser(User temp) throws DAOException {
		boolean flag =false;
		
		if(!IsExist(temp.getEmail())){
			Session session = factory.openSession();
			
			try{
				session.beginTransaction();
				session.save(temp);
				session.getTransaction().commit();
				flag = true; 
			}catch (HibernateException e) {
				throw new DAOException(e.getMessage(),e);
			}finally {
				session.close();
			}
		}
		
		return flag;
	}

	public boolean IsExist(String email) throws DAOException {
		Session session = factory.openSession();
		boolean flag = false;
		
		try{
			session.beginTransaction();
			String hql = String.format("From User u Where u.email = '%s'", email);
			List users = session.createQuery(hql).list();
			if(users.size() > 0)
			{
				flag = true;
			}
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{
			session.close();
		}
		
		return flag;
	}

	public User FindUser(int id) throws DAOException {
		User user = null;
		Session session = factory.openSession();
		
		try{
			session.beginTransaction();
			user = (User) session.get(User.class, id);
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally {
			session.close();
		}
		
		return user;
	}

	public User FindUser(String email, String password) throws DAOException {
		User user = null;
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			String hql = String.format("From User u Where u.email = '%s' and u.password = '%s'", email,password);
			List users = session.createQuery(hql).list();
			if(users.size() > 0)
			{
				user = (User)users.get(0);
			}
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{
			session.close();
		}
		
		return user;
	}
	
	public User FindUserByEmail(String email) throws DAOException {
		User user = null;
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			String hql = String.format("From User u Where u.email = '%s'", email);
			List users = session.createQuery(hql).list();
			if(users.size() > 0)
			{
				user = (User)users.get(0);
			}
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{
			session.close();
		}
		
		return user;
	}

	public void EditUser(User temp) throws DAOException {
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			User user = (User) session.get(User.class, temp.getId());
			user.setPassword(temp.getPassword());
			user.setFirstName(temp.getFirstName());
			user.setLastName(temp.getLastName());
			user.setAge(temp.getAge());
			user.setGender(temp.getGender());
			session.update(user);
			session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{
			session.close();
		}
	}

	public void DeleteUser(int id) throws DAOException {
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			User user = (User) session.get(User.class, id);
			session.delete(user);
			session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}		
	}

	public void DeleteUser(User temp) throws DAOException {
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			session.delete(temp);
			session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}				
	}

	public User[] GetAllUsers() throws DAOException {
		Session session = factory.openSession();
		User[] users = null;

		try{
			session.beginTransaction();
			String hql = "From User";
			List usersList = session.createQuery(hql).list();
			users = new User[usersList.size()];
			users = (User[]) usersList.toArray(users);
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}
		
		return users;
	}

	@Override
	public void AddResult(ResultAnalysis result) throws DAOException {
		
		if(FindUser(result.getUserId()) != null){
			
			Session session = factory.openSession();
			
			try{
				session.beginTransaction();
				session.save(result);
				session.getTransaction().commit(); 
			}catch (HibernateException e) {
				throw new DAOException(e.getMessage(),e);
			}finally {
				session.close();
			}
		}
	}

	@Override
	public void AddResults(ResultAnalysis[] results) throws DAOException {
		Session session = factory.openSession();
		session.beginTransaction();

		try{
		for (ResultAnalysis resultAnalysis : results) {
				session.save(resultAnalysis);
				}		
		
		session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally {
			session.close();
		}	
	}

	@Override
	public ResultAnalysis[] FindResults(int gameId, int userId) throws DAOException {
		Session session = factory.openSession();
		ResultAnalysis[] results = null;
		
		try{
			session.beginTransaction();
			String hql = String.format("From ResultAnalysis r Where r.gameId = '%s' and r.userId = '%s'", gameId,userId);
			List resultList = session.createQuery(hql).list();
			results = new ResultAnalysis[resultList.size()];
			results = (ResultAnalysis[]) resultList.toArray(results);
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{
			session.close();
		}
		
		return results;
	}

	
	@Override
	public void DeleteResult(ResultAnalysis result) throws DAOException {
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			session.delete(result);
			session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}		
	}

	@Override
	public void DeleteResults(ResultAnalysis[] results) throws DAOException {
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			for (ResultAnalysis resultAnalysis : results) {
				session.delete(resultAnalysis);
			}
			session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}		
	}

	@Override
	public boolean isFriendShipExist(int firstFriendId, int secondFriendId) throws DAOException {
		Session session = factory.openSession();
		boolean flag = false;
		
		try{
		session.beginTransaction();
		String hql = String.format("From Friends f Where f.firstUserId = '%s' and f.secondUserId = '%s'", firstFriendId, secondFriendId);
		List friendsList = session.createQuery(hql).list();
		if(friendsList.size() > 0){
			flag = true;
		}
		
		hql = String.format("From Friends f Where f.firstUserId = '%s' and f.secondUserId = '%s'", secondFriendId,firstFriendId);
		friendsList = session.createQuery(hql).list();
		if(friendsList.size() > 0){
			flag = true;
		}
		
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}	
		
		return flag;
	}

	@Override
	public void addFriendship(Friends friends) throws DAOException {
		if(!isFriendShipExist(friends.getFirstUserId(), friends.getSecondUserId())){
			Session session = factory.openSession();

			try{
				session.beginTransaction();
				session.save(friends);
				session.getTransaction().commit();
			}catch (HibernateException e) {
				throw new DAOException(e.getMessage(),e);
			}finally {
				session.close();
			}
		}
	}

	@Override
	public ArrayList<Integer> getAllUserFriends(int userId) throws DAOException {
		Session session = factory.openSession();
		ArrayList<Integer> friends = new ArrayList<Integer>();
		
		try{
		session.beginTransaction();
		
		String hql = String.format("From Friends f Where f.firstUserId = '%s'", userId);
		List<Friends> friendsList = session.createQuery(hql).list();
		for(Friends friend : friendsList){
			friends.add(friend.getSecondUserId());
		}
		
		hql = String.format("From Friends f Where f.secondUserId = '%s'", userId);
		friendsList = session.createQuery(hql).list();
		for(Friends friend : friendsList){
			friends.add(friend.getFirstUserId());
		}
		
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally{		
			session.close();
		}	
		
		return friends;
	}

	@Override
	public void addUserImage(UserImage temp) throws DAOException {
		Session session = factory.openSession();

		try{
			session.beginTransaction();
			session.save(temp);
			session.getTransaction().commit();
		}catch (HibernateException e) {
			throw new DAOException(e.getMessage(),e);
		}finally {
			session.close();
		}
	}

	@Override
	public String[] getUserImages(int userId) throws DAOException {
		Session session = factory.openSession();
		String[] images = null;
		
		try{
			session.beginTransaction();
			String hql = String.format("From UserImage i Where i.userId = '%s'", userId);
			List<UserImage> imagesList = session.createQuery(hql).list();
			images = new String[imagesList.size()];
			for(int i=0;i<images.length;i++ ){
				images[i] = imagesList.get(i).getImageName();
			}
		}catch(HibernateException e){
			throw new DAOException(e.getMessage(), e);
		}finally {
			session.close();
		}
		return images;
	}

	@Override
	public void deleteUserImage(UserImage temp) throws DAOException {
		Session session = factory.openSession();
		
		try{
			session.beginTransaction();
			String hql = String.format("From UserImage i Where i.userId = '%s' and i.imageName = '%s'", temp.getUserId(),temp.getImageName());
			List<UserImage> imagesList = session.createQuery(hql).list();
			if(!imagesList.isEmpty()){
				session.delete(imagesList.get(0));
			}
			
			session.getTransaction().commit();
		}catch (Exception e) {
			throw new DAOException(e.getMessage(), e);
		}finally {
			session.close();
		}
	}	
}
