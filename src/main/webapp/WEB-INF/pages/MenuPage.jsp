<%@ page language="java" contentType="text/html; charset=windows-1255"
    pageEncoding="windows-1255"%>
<%@page import="com.hit.model.User" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1255">
<title>Menu Page</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>

<% 
	User user = (User)request.getSession().getAttribute("user");
	if(user != null){
		out.println("<h2>Welcome, " + user.getFirstName() + " " + user.getLastName() + "</h2>");
	}
	else{
		out.println("<h2>Welcome!</h2>");
	}
%>
<br/>

<a href="client_side/ballGame/index.html"> <input type="button" class="btn btn-primary btn-block" value="ball game"> </a> 

<br/>

<a href="#####"> <input type="button" class="btn btn-success btn-block" value="another game"> </a> 
<br/>

<a href="#####"> <input type="button" class="btn btn-info btn-block"  value="another game"> </a> 
<br/>

</body>
</html>