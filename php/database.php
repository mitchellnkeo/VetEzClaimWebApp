<?php

// database connection code
if(isset($_POST['name']))
{
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('localhost', 'noblkile_vetezclaim', 'tabzod-5dyRxa-cyhnum', 'noblkile_vetezclaim');

// get the post records
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// database insert SQL code
$sql = "INSERT INTO `contacts` (`Id`, `fldName`, `fldEmail`, `fldMessage`) VALUES ('0', '$name', '$email', '$message')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Contact Records Inserted";
}
}
else
{
	echo "Are you a genuine visitor?";
	
}

?>