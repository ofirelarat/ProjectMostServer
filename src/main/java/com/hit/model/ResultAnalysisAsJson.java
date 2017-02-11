package com.hit.model;

import java.util.ArrayList;
import java.util.Collections;


public class ResultAnalysisAsJson {

	private int game_id;
	private int user_id;
	private String time;
	private Data data;
	
	public ResultAnalysisAsJson() {
		super();
		// TODO Auto-generated constructor stub
	}


	public ResultAnalysisAsJson(int gameId, int userId, String time) {
		super();
		this.game_id = gameId;
		this.user_id = userId;
		this.time = time;
	}
	
	public ResultAnalysisAsJson(int gameId, int userId, String time, Data data) {
		super();
		this.game_id = gameId;
		this.user_id = userId;
		this.time = time;
		this.data = data;
	}

	public int getGame_id() {
		return game_id;
	}

	public void setGame_id(int gameId) {
		this.game_id = gameId;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int userId) {
		this.user_id = userId;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}


	public Data getData() {
		return this.data;
	}


	public void setData(Data data) {
		this.data = data;
	}


	public static ResultAnalysis[] parseToResult(ResultAnalysisAsJson resultAsJson){
		ResultAnalysis[] results = new ResultAnalysis[resultAsJson.getData().getLevels().length];
		for(int i=0;i<results.length;i++){
			results[i] = new ResultAnalysis(resultAsJson.getGame_id(),resultAsJson.getUser_id(),resultAsJson.getTime(),i,resultAsJson.getData().getLevels()[i].getCountPerLevel(),resultAsJson.getData().getLevels()[i].getErrorsPerLevel());
		}
		
		return results;
	}
	
	public static ResultAnalysisAsJson[] parseToResultAsJson(ArrayList<ResultAnalysis> results){
		Collections.sort(results, (x1,x2) -> x1.getTime().compareTo(x2.getTime()));
		//Collections.sort(results, (x1,x2) -> Integer.valueOf(x1.getLevel()).compareTo(Integer.valueOf(x2.getLevel())));
		ArrayList<Level> levels = new ArrayList<>();
		
		ArrayList<ResultAnalysisAsJson> resultsJson = new ArrayList<>();
		
		for (int i=0;i<results.size()-1;i++) {
			if(levels.size()>0 && results.get(i).getLevel()==0){
				levels = new ArrayList<>();
				levels.add(new Level(results.get(i).getScore(),results.get(i).getErrors()));
			}
			else{
				levels.add(new Level(results.get(i).getScore(), results.get(i).getErrors()));
				if(i < results.size()-1 && !results.get(i).getTime().equals(results.get(i+1).getTime())){
					Level[] levelsArray = new Level[levels.size()]; 
					levelsArray = levels.toArray(levelsArray);
					Data levelsData = new Data(levelsArray);
					
					resultsJson.add(new ResultAnalysisAsJson(results.get(i).getGameId(), results.get(i).getUserId(), results.get(i).getTime(),levelsData));
				}
			}
		}
				
		ResultAnalysisAsJson[] resultsJsonArray = new ResultAnalysisAsJson[resultsJson.size()];
		resultsJsonArray = resultsJson.toArray(resultsJsonArray);
		return resultsJsonArray;
	}
	
}


