<?php
session_start();

    include("connections.php");
    include("functions.php");

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        if(!empty($username) && !empty($password) && !is_numeric($username)) 
        {
            //save to database
            $query = "insert into registration (username, email, password) values ('$username', '$email', '$password')";
            mysqli_query($con,$query);
            header("Location: index.php");
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
                    <input type="text" name="username" class="input-field" placeholder="Username" id="username" required>
                    <input type="email" name="email" class="input-field" placeholder="Email" id="email" required>
                    <input type="password" name="password" class="input-field" placeholder="Password" id="pwd" required>
                    <input type="checkbox" class="chech-box"><span>I agree to the terms & conditions</span>
                    <button type="submit" class="submit-btn">Register</button>
                </form>

            </div>
        </div>

        <script src="login&register.js">
        </script>

    </body>
</html>