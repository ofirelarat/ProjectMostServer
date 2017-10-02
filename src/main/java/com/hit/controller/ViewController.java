package com.hit.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.cloudinary.Cloudinary;
import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.ExcelResultWriter;
import com.hit.model.PdfResultWriter;
import com.hit.model.ResultAnalysis;
import com.hit.model.User;
import com.hit.model.UserImage;


@Controller
@EnableWebMvc
public class ViewController {	

	@RequestMapping(value="/view/home", method=RequestMethod.GET)
	public String getHomePage(){
		return "redirect:/pages/client_side/homePage.html";
	}

	@RequestMapping(value="/view/login", method=RequestMethod.GET)
	public String getLoginPage(){
		return "redirect:/pages/LoginPage.html";
	}

	@RequestMapping(value="/view/score", method=RequestMethod.GET)
	public String getScorePage(){
		return "redirect:/pages/ScorePage.html";
	}

	@RequestMapping(value="/userIdandLevel/{gameId}", method=RequestMethod.GET)
	@ResponseBody
	public String getUserIdandLevel(HttpSession session,@PathVariable int gameId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();

		if(session.getAttribute("userId") != null){
			try {
				int userId = (int)session.getAttribute("userId");
				ResultAnalysis[] results = DAO.FindResults(gameId, userId);
				int lastLevel = 0;

				if(results.length > 0){
					lastLevel = results[results.length-1].getLevel() + 1;
				}

				return userId + "$" + lastLevel;
			}
			catch (DAOException e) {
				Logger logger =  LoggerFactory.getLogger("exception.viewCotroller.userIdandLevel");
				 logger.error(e.getMessage());
				 e.printStackTrace();
			}
		}

		return 0 + "$" + 0;
	}


	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String LoginPost(HttpServletRequest request){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			
			if(email.equals("admin") && password.equals("admin")){
				return "redirect:/pages/AdminPage.html";
			}
			else{
				User user = DAO.FindUser(email, password);
				
				if(user == null){
					return "redirect:/pages/ErrorPage.html";
				}
				
				request.getSession().setAttribute("userId", user.getId());
				return "redirect:/pages/client_side/homePage.html";
			}
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.PostLogin");
			logger.error(e.getMessage());
			//e.printStackTrace();
		}

		return "redirect:/pages/ErrorPage.html";
	}
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String LoginGet(HttpServletRequest request,@RequestParam(value="email")String email,@RequestParam(value="password")String password){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			User user = DAO.FindUser(email, password);
			
			if(user == null){
				return "redirect:/pages/ErrorPage.html";
			}
			
			request.getSession().setAttribute("userId", user.getId());
			return "redirect:/pages/client_side/homePage.html";
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.GetLogin");
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		return null;
	}
	
	@RequestMapping(value="/loginF", method=RequestMethod.GET)
	public String LoginGetF(HttpServletRequest request,HttpServletResponse response,@RequestParam(value="email")String email,@RequestParam(value="password")String password){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			User user = DAO.FindUser(email, password);
			
			if(user == null){
				return "redirect:/pages/ErrorPage.html";
			}
			
			request.getSession().setAttribute("userId", user.getId());
			response.setContentType("text/html");
			response.setCharacterEncoding("utf-8");
			return "pages/ImageViewPage.html";
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.GetLogin");
			logger.error(e.getMessage());
			e.printStackTrace();
		} 
		
		return null;
	}
	
	@RequestMapping(value="/loginFToMenu", method=RequestMethod.GET)
	public String LoginGetFToMenuPage(HttpServletRequest request,HttpServletResponse response,@RequestParam(value="email")String email,@RequestParam(value="password")String password){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			User user = DAO.FindUser(email, password);
			
			if(user == null){
				return "redirect:/pages/ErrorPage.html";
			}
			
			request.getSession().setAttribute("userId", user.getId());
			response.setContentType("text/html");
			response.setCharacterEncoding("utf-8");
			return "pages/homePage2.html";
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.GetLogin");
			logger.error(e.getMessage());
			e.printStackTrace();
		} 
		
		return null;
	}

	
	@RequestMapping(value="/view/resultsPdf", method=RequestMethod.GET)
	public ResponseEntity<byte[]> getResultsAnalysisPDF(@RequestParam(value="userId")int userId,@RequestParam(value="gameId") int gameId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			ResultAnalysis[] results = DAO.FindResults(gameId, userId);
			PdfResultWriter.writeFile(results);
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getPdf.getResults");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}

		byte[] data = null;
		Path path = Paths.get(PdfResultWriter.FILE_NAME);
		try {
			data = Files.readAllBytes(path);
		} catch (IOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getPdt.readFile");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/pdf"));
		String fileName = "ResultAnalysis.pdf";
		headers.setContentDispositionFormData(fileName, fileName);
		headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
		ResponseEntity<byte[]> response = new ResponseEntity<>(data,headers,HttpStatus.OK);

		return response;
	}
	
	@RequestMapping(value="/view/userResultsCSV", method=RequestMethod.GET)
	public void userResultsCSV(HttpServletRequest request,HttpServletResponse response){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		String csvFileName = "results.csv";
        response.setContentType("text/csv");
 
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"",
                csvFileName);
        response.setHeader(headerKey, headerValue);
 

        String[] header = { "id", "gameId", "userId","time", "level",
                "score", "errors"};
        
        try {
        	User user = DAO.FindUserByEmail(request.getParameter("email"));
        	if(user != null){
	        	int userId = user.getId();
	        	
				ResultAnalysis[] resultsGame1 = DAO.FindResults(1, userId);
				ResultAnalysis[] resultsGame2 = DAO.FindResults(2, userId);
				ResultAnalysis[] resultsGame3 = DAO.FindResults(3, userId);
				ResultAnalysis[] resultsGame4 = DAO.FindResults(4, userId);
	
				ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(),CsvPreference.STANDARD_PREFERENCE);
		        csvWriter.writeHeader(header);
	
		        for (ResultAnalysis result : resultsGame1) {
		        	csvWriter.write(result, header);
				}  
		        
		        for (ResultAnalysis result : resultsGame2) {
		        	csvWriter.write(result, header);
				}   
		        
		        for (ResultAnalysis result : resultsGame3) {
		        	csvWriter.write(result, header);
				}   
		        
		        for (ResultAnalysis result : resultsGame4) {
		        	csvWriter.write(result, header);
				}
	
				csvWriter.close();
        	}
		} catch (DAOException | IOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getPdf.getResults");
			logger.error(e.getMessage());
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/view/ResultsCSV", method=RequestMethod.GET)
	public void allUsersResultsCSV(HttpServletResponse response){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		String csvFileName = "results.csv";
        response.setContentType("text/csv");
 
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"",
                csvFileName);
        response.setHeader(headerKey, headerValue);
 
        String[] header = { "id", "gameId", "userId","time", "level",
                "score", "errors"};
        
        try {
        		User[] users = DAO.GetAllUsers();
        		ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(),CsvPreference.STANDARD_PREFERENCE);
        		csvWriter.writeHeader(header);
        	
	        	for (User user : users) {
					
				ResultAnalysis[] resultsGame1 = DAO.FindResults(1, user.getId());
				ResultAnalysis[] resultsGame2 = DAO.FindResults(2, user.getId());
				ResultAnalysis[] resultsGame3 = DAO.FindResults(3, user.getId());
				ResultAnalysis[] resultsGame4 = DAO.FindResults(4, user.getId());
	
		        for (ResultAnalysis result : resultsGame1) {
		        	csvWriter.write(result, header);
				}  
		        
		        for (ResultAnalysis result : resultsGame2) {
		        	csvWriter.write(result, header);
				}   
		        
		        for (ResultAnalysis result : resultsGame3) {
		        	csvWriter.write(result, header);
				}   
		        
		        for (ResultAnalysis result : resultsGame4) {
		        	csvWriter.write(result, header);
				}
        	}
			csvWriter.close();
		} catch (DAOException | IOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getPdf.getResults");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/getImage/{imageName}", method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName,HttpServletResponse response){
		try {
			File imgPath = new File("src/main/resources/images/" + imageName + ".jpg");
			byte[] image = Files.readAllBytes(imgPath.toPath());
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG);
			headers.setContentLength(image.length);
			return new ResponseEntity<>(image,headers,HttpStatus.OK);
		} catch (IOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getImage");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		return null;
	}
	
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	private @ResponseBody
	String uploadFileHandler(@RequestParam("file") MultipartFile file) {
	    if (!file.isEmpty()) {
	        try {
	            byte[] bytes = file.getBytes();

	            // Creating the directory to store file
	            String rootPath = "path To save your file/Spring_Upload";
	            File dir = new File(rootPath + File.separator + "tmpFiles");
	            if (!dir.exists())
	                dir.mkdirs();

	            // Create the file on server
	            File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getName());
	            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
	            stream.write(bytes);
	            stream.close();	
	            
	            // Upload the image to cloudirary
	            Cloudinary cloudinary = new Cloudinary("cloudinary://412393645827175:Ovp0gyq-w2H1zpNuXrcxgV5qKIo@dyzx9rb3z");
	            Map entryMap = new HashMap<String,Object>();
	            Map uploadResult = cloudinary.uploader().upload(serverFile,entryMap);
	            
	            // Save the image url in the DB
	            HibernateMOSTDAO DAO = HibernateMOSTDAO.getInstance();
	            DAO.addImage(uploadResult.get("url").toString());

	            return "You successfully uploaded file";
	        } catch (Exception e) {
	            return "You failed to upload => " + e.getMessage();
	        }
	    } else {
	        return "You failed to upload because the file was empty.";
	    }
	}
	
	@RequestMapping(value="/getImageForUser",method=RequestMethod.GET)
	public @ResponseBody String getUserImage(HttpServletRequest request){
		if(request.getSession().getAttribute("userId") == null)
		{
			return null;
		}
		
        int userID = (int) request.getSession().getAttribute("userId");
		HibernateMOSTDAO DAO = HibernateMOSTDAO.getInstance();
        try {
			String[] urls = DAO.getUserImages(userID);
			if(urls != null && urls.length > 0){
				//DAO.deleteUserImage(userID, urls[0]);
				return urls[0];
			}
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        return null;
	}

	@RequestMapping(value="/deleteUserImage",method=RequestMethod.DELETE)
	public @ResponseBody String deleteUserImage(HttpServletRequest request, @RequestParam("url") String url){
        int userID = (int) request.getSession().getAttribute("userId");
		HibernateMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		
		try {
			DAO.deleteUserImage(userID, url);
			return "user's image deleted";
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "image didn't deleted";
	}
	
	@RequestMapping("/returnToMenu")
	public String gotoMenuPage(HttpServletRequest request){
		if(request.getSession().getAttribute("userId") == null)
		{
			return "redirect:/view/login";
		}
		
        int userID = (int) request.getSession().getAttribute("userId");
		HibernateMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			User user = DAO.FindUser(userID);
			if(user != null){
				return "redirect:/loginFToMenu?email=" + user.getEmail() + "&password=" + user.getPassword();
			}
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "redirect:/view/login";
	}
}
