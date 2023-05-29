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
            header("Location: index.php");
            die;
        }
        else
        {
            echo "Please enter some valid information!";
        }
    }

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $username = $_POST['lusername'];
        $password = $_POST['lpwd'];

        if(!empty($username) && !empty($password) && !is_numeric($username)) 
        {
            //read from database
            $query = "select * from registration where username = '$username' limit 1";
            $result = mysqli_query($con,$query);

            if($result)
            {
                if($result && mysqli_num_rows($result)>0)
                {
                    $user_data = mysqli_fetch_assoc($result);
                    if($user_data['password'] === $password)
                    {
                        header("Location: notes.html");
                        die;
                    }
                }
            }
            
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
  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" /> -->
    <link rel="stylesheet" href="login&register.css">
</head>
    <body>
        <div class="super">
        <div class="form-box">
            <div class="button-box">
                <div id="btn"></div>
                <button type="button" class="toggle-btn" onclick="login()">Log In</button>
                <button type="button" class="toggle-btn" onclick="register()">Register</button>
            </div>              
                <!--
                <div class="social-icons">
                    <img src="fb.png">
                    <img src="tw.png">
                    <img src="gp.png">
                </div>
                -->
                
                <form role="form" onsubmit="loginFunction(event)" id="login" class="input-group" autocomplete="off" method="post">
                    <input type="text" name="lusername" class="input-field" placeholder="Username" id="lusername" required>
                    <input type="password" name="lpwd" class="input-field" placeholder="Password" id="lpwd" required>
                    <input type="checkbox" class="chech-box"><span>Remember Password</span>
                    <button type="submit" class="submit-btn">Login</button>
                    <p id="result">Welcome, Login...</p>
                </form>

                <form role="form" onsubmit="registerFunction(event)" id="register" class="input-group" autocomplete="off" method="post">
                    <input type="text" name="username" class="form-control" placeholder="Username" id="username" required>
                    <input type="text" name="firstName" class="form-control" placeholder="First Name" id="firstname" required>
                    <input type="text" name="lastName" class="form-control" placeholder="Last Name" id="lastname" required>
                    <input type="email" name="email" class="form-control" placeholder="Email" id="email" required>
                    <input type="password" name="password" class="form-control" placeholder="Password" id="pwd" required>
                    <input type="checkbox" class="chech-box"><span>I agree to the terms & conditions</span>
                    <button type="submit" class="submit-btn">Register</button>
                    
                </form>

            </div>
        </div>

        

        <script src="login&register.js">
        </script>

    </body>
</html>