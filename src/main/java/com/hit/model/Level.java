package com.hit.model;

public class Level {
	
		private int countPerLevel;
		private int errorsPerLevel;
		
		public Level() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Level(int countPerLevel, int errorsPerLevel) {
			super();
			this.countPerLevel = countPerLevel;
			this.errorsPerLevel = errorsPerLevel;
		}
		public int getCountPerLevel() {
			return countPerLevel;
		}
		public void setCountPerLevel(int countPerLevel) {
			this.countPerLevel = countPerLevel;
		}
		public int getErrorsPerLevel() {
			return errorsPerLevel;
		}
		public void setErrorsPerLevel(int errorsPerLevel) {
			this.errorsPerLevel = errorsPerLevel;
		}
}


