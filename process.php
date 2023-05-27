<?php
    $username = $_POST['username'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = $_POST['password'];


    // Database connection
	$conn = new mysqli('localhost','root','','test-taskit');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into registration(username, firstname, lastname, email, password) values(?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $username, $firstname, $lastname, $email, $password);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}

?>