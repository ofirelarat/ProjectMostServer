package com.hit.controller;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.ResultAnalysis;
import com.hit.model.ResultAnalysisAsJson;

@RestController
public class GameResultController {

	@RequestMapping(value = "/game/addresult" ,method=RequestMethod.POST)
	public void sendGameResult(@RequestBody ResultAnalysisAsJson resultJson){
		ResultAnalysis[] results = ResultAnalysisAsJson.parseToResult(resultJson);
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			DAO.AddResults(results);
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/game/getresult",method=RequestMethod.GET)
	public ResultAnalysisAsJson[] getGameResult(@RequestParam(value="gameId")int gameId,@RequestParam(value="userId")int userId){
		ResultAnalysis[] results = null;
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			results = DAO.FindResults(gameId, userId);
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		ResultAnalysisAsJson[] resultJson = null;
		if(results.length > 0){
			resultJson = ResultAnalysisAsJson.parseToResultAsJson(new ArrayList<ResultAnalysis>(Arrays.asList(results)));
		}
		
		return null;
	}
}
