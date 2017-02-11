package com.hit.controller;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
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
import org.springframework.web.context.support.ServletContextResource;

import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.PdfResultWriter;
import com.hit.model.ResultAnalysis;
import com.hit.model.User;

@Controller
public class ViewController {	

	@Autowired
    private ServletContext servletContext;
	
	@RequestMapping(value="/view/home", method=RequestMethod.GET)
	public String getHomePage(){
		return "redirect:/pages/HomePage.html";
	}
	
	@RequestMapping(value="/view/login", method=RequestMethod.GET)
	public String getLoginPage(){
		return "redirect:/pages/LoginPage.html";
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String Login(HttpServletRequest request){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			User user = DAO.FindUser(email, password);
			request.getSession().setAttribute("userId", user.getId());
			return "redirect:/pages/HomePage.html";
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	@RequestMapping(value="/view/results", method=RequestMethod.GET)
	public ResponseEntity<byte[]> getResultsAnalysis(@RequestParam(value="userId")int userId,@RequestParam(value="gameId") int gameId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			ResultAnalysis[] results = DAO.FindResults(gameId, userId);
			PdfResultWriter.writeFile(results);
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		byte[] data = null;
		Path path = Paths.get(PdfResultWriter.FILE_NAME);
		try {
			data = Files.readAllBytes(path);
		} catch (IOException e) {
			// TODO Auto-generated catch block
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

	@RequestMapping(value="/getImage/{imageName}", method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Resource> getImage(@PathVariable String imageName){ 
		final HttpHeaders headers = new HttpHeaders();
        Resource resource = new ServletContextResource(servletContext, "src/main/resources/images/" + imageName);
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}
}
