package com.hit.model;

import java.util.Date;

public class ResultAnalysis {

	private int id;
	private int gameId;
	private int userId;
	private String time;
	private int level;
	private int score;
	private int errors;
	
	public ResultAnalysis() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ResultAnalysis(int gameId, int userId, String time, int level, int score, int errors) {
		super();
		this.gameId = gameId;
		this.userId = userId;
		this.time = time;
		this.level = level;
		this.score = score;
		this.errors = errors;
	}

	public int getId(){
		return id;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getErrors() {
		return errors;
	}

	public void setErrors(int errors) {
		this.errors = errors;
	}

	@Override
	public String toString() {
		return "ResultAnalysis [gameId=" + gameId + ", userId=" + userId + ", time=" + time + ", level=" + level
				+ ", score=" + score + ", errors=" + errors + "]";
	}
}
