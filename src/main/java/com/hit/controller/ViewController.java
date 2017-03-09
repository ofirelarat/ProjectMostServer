package com.hit.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.ExcelResultWriter;
import com.hit.model.PdfResultWriter;
import com.hit.model.ResultAnalysis;
import com.hit.model.User;


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
	public int[] getUserIdandLevel(HttpSession session,@PathVariable int gameId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();

		if(session.getAttribute("userId") != null){
			try {
				int userId = (int)session.getAttribute("userId");
				ResultAnalysis[] results = DAO.FindResults(gameId, userId);
				int lastLevel = 0;

				if(results.length > 0){
					lastLevel = results[results.length-1].getLevel() + 1;
				}

				return new int[]{userId,lastLevel};
			}
			catch (DAOException e) {
				Logger logger =  LoggerFactory.getLogger("exception.viewCotroller.userIdandLevel");
				 logger.error(e.getMessage());
				 e.printStackTrace();
			}
		}

		return new int[]{0,0};
	}


	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String LoginPost(HttpServletRequest request){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			User user = DAO.FindUser(email, password);
			request.getSession().setAttribute("userId", user.getId());
			return "redirect:/pages/client_side/homePage.html";
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.PostLogin");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}

		return null;
	}
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String LoginGet(HttpServletRequest request,@RequestParam(value="email")String email,@RequestParam(value="password")String password){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			User user = DAO.FindUser(email, password);
			request.getSession().setAttribute("userId", user.getId());
			return "redirect:/pages/client_side/homePage.html";
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

	@RequestMapping(value="/view/resultsXls", method=RequestMethod.GET)
	public ResponseEntity<byte[]> getResultsAnalysisXLS(@RequestParam(value="userId")int userId,@RequestParam(value="gameId") int gameId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			ResultAnalysis[] results = DAO.FindResults(gameId, userId);
			ExcelResultWriter.writeFile(results);
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getPdf.getResults");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}

		byte[] data = null;
		Path path = Paths.get(ExcelResultWriter.FILE_NAME);
		try {
			data = Files.readAllBytes(path);
		} catch (IOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.viewCotroller.getPdt.readFile");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/xls"));
		String fileName = "ResultAnalysis.xls";
		headers.setContentDispositionFormData(fileName, fileName);
		headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
		ResponseEntity<byte[]> response = new ResponseEntity<>(data,headers,HttpStatus.OK);

		return response;
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
}
