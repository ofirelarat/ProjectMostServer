package MOSTProject.MOSTProject;

import org.junit.Assert;
import org.junit.Test;

import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.Friends;
import com.hit.model.User;

/**
 * 
 * @author ofir
 *
 *testing the DB connection 
 */
public class DAOTest {

	@Test
	public void test() {
	/*	User user = new User("ofir@.email","12345","ofir","elarat",20,User.Gender.male);
		
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			DAO.AddUser(user);
			user = DAO.FindUser(user.getEmail(),user.getPassword());
			System.out.println(user.toString());
			//Assert.assertEquals(new Integer(20), user.getAge());
			
			user.setAge(25);
			DAO.EditUser(user);
			user = DAO.FindUser(user.getId());
			System.out.println(user.toString());
			Assert.assertEquals(25, 25);
			
			Friends f1 = new Friends(1,2);
			Friends f2 = new Friends(1,3);
			Friends f3 = new Friends(3,1);
			
			DAO.addFriendship(f1);
			DAO.addFriendship(f3);
			DAO.addFriendship(f2);
		
			DAO.getAllUserFriends(1);

		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	}
}
