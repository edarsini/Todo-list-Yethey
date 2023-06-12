<?php
session_start();

    
    include("connections.php");
    include("functions.php");

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $username = $_POST['username'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        

        if(!empty($username) && !empty($firstname) && !empty($lastname) && !empty($password) && !is_numeric($username)) 
        {
            //save to database
            $query = "insert into registration (username, firstname, lastname, email, password) values ('$username', '$firstname', '$lastname', '$email', '$password')";
            mysqli_query($con,$query);
            header("Location: login.php");
            die;
        }
        else
        {
            echo "Please enter some valid information!";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <script lang="javascript" type="text/javascript">
    window.history.forward();
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To Do List Yethey!</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <link rel="stylesheet" href="login&register.css">
</head>
    <body>
    <div class="super">
        <div class="form-box">
            <div class="container">
                <div class="container" id="title">
                    <h2>SignUp Page </h2>
                </div>               
                <form method="post" id="register">
                <!-- Username -->
                <div class="mb-3">
                    <label for="exampleInputUsername1" class="form-label">Username</label>
                    <input name="username" type="username" class="form-control" id="username">
                </div>
                
                <!-- First and Last Name -->
                <div class="row mb-3">
                    <div class="col">
                    <label for="exampleInputFirstName" class="form-label">First Name</label>
                    <input name="firstname" type="text" class="form-control" id="exampleInputFirstName">
                    </div>
                    <div class="col">
                    <label for="exampleInputLastName" class="form-label">Last Name</label>
                    <input name="lastname" type="text" class="form-control" id="exampleInputLastName">
                    </div>
                </div>
                
                <!-- Email -->
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input name="email" type="email" class="form-control" id="email">
                </div>
                
                <!-- Password -->
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input name="password" type="password" class="form-control" id="exampleInputPassword1">
                </div>
                
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Agree to the terms & Conditions</label>
                </div>
                
                <button type="submit" class="btn btn-primary custom-btn">Submit</button>
                </form>
            </div>  

        <script src="login&register.js"> </script>
        </div>

    </body>
</html>