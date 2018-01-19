package com.hit.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.AsyncRestTemplate;

import com.hit.database.HibernateMOSTDAO;
import com.hit.database.IMOSTDAO;
import com.hit.exceptions.DAOException;
import com.hit.model.ResultAnalysis;
import com.hit.model.ResultAnalysisAsJson;


@RestController
public class GameResultController {

	@RequestMapping(value = "/game/addresult" ,method=RequestMethod.POST)
	public void sendGameResult(@RequestBody ResultAnalysisAsJson resultJson){
		if(resultJson.getUserID() != 0){
			ResultAnalysis[] results = ResultAnalysisAsJson.parseToResult(resultJson);
			IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
			try {
				DAO.AddResults(results);
			} catch (DAOException e) {
				 Logger logger = (Logger) LoggerFactory.getLogger("exception.gameCotroller.addResult");
				 logger.error(e.getMessage());
				e.printStackTrace();
			}
		}
	}
	
	@RequestMapping(value="/game/getresult",method=RequestMethod.GET)
	public ResultAnalysis[] getGameResult(@RequestParam(value="gameId")int gameId,@RequestParam(value="userId")int userId){
		ResultAnalysis[] results = null;
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			results = DAO.FindResults(gameId, userId);
		} catch (DAOException e) {
			Logger logger = (Logger) LoggerFactory.getLogger("exception.gameCotroller.getResult");
			 logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		return results;
	}
	
	@RequestMapping(value="/game/getAverageScore",method=RequestMethod.GET)
	public Integer[] getAverageResult(@RequestParam(value="gameId")int gameId,@RequestParam(value="userId")int userId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		ResultAnalysis[] results = null;

		try {
			results = DAO.FindResults(gameId, userId);
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Map<String, Integer> sumScorePerDate = new HashMap<String, Integer>();
		for (int i = 0; i<results.length;i++) {
			if(!sumScorePerDate.containsKey(results[i].getTime())){
				sumScorePerDate.put(results[i].getTime(), results[i].getScore());
				if(i!=0){
					int sum = sumScorePerDate.get(results[i].getTime());
					sumScorePerDate.put(results[i].getTime(), sum/(results[i].getLevel() + 1));
				}
			}
			else{
				int sum = sumScorePerDate.get(results[i].getTime());
				sumScorePerDate.put(results[i].getTime(), sum + results[i].getScore());
			}
		}
		int sum = sumScorePerDate.get(results[results.length-1].getTime());
		sumScorePerDate.put(results[results.length-1].getTime(), sum/(results[results.length-1].getLevel() + 1));

		ArrayList<Integer> averagesList = new ArrayList<>();
		for (Entry<String, Integer> score: sumScorePerDate.entrySet()) {
			averagesList.add(score.getValue());
		}


		Integer[] averagesArray = new Integer[sumScorePerDate.size()];
		return averagesList.toArray(averagesArray);
	}
	
	@RequestMapping(value="/deleteResults/{userId}/{gameId}", method=RequestMethod.DELETE)
	public void deleteResults(@PathVariable int userId, @PathVariable int gameId){
		IMOSTDAO DAO = HibernateMOSTDAO.getInstance();
		try {
			DAO.DeleteResults(DAO.FindResults(gameId, userId));
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
