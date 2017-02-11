package com.hit.exceptions;

/**
 * 
 * @author ofir
 *
 */
public class DAOException extends Exception
{
	private String message;
	private Exception exception;
	
	public DAOException(String message, Exception e)
	{
		this.message = message;
		this.exception = e;
	}

	public String getMessage() {
		return message;
	}

	public Exception getException() {
		return exception;
	}	
}
