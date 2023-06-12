<?php
session_start();

    
    include("connections.php");
    include("functions.php");

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $username = $_POST['username'];
        $password = $_POST['password'];

        if(!empty($username) && !empty($password) && !is_numeric($username)) 
        {
            //read from database
            $query = "select * from users where username = '$username' limit 1";
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
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <link rel="stylesheet" href="login&register.css">
</head>
    <body>
        <div class="super">
        <div class="form-box">
            <div class="container">
                <div class="container" id="title">
                    <h2>Login Page </h2>
                </div>              
            <form>
                <div class="mb-3">
                    <label for="exampleInputUsername1" class="form-label">Username</label>
                    <input name="username" type="username" class="form-control" id="username">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input name="password" type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Remember Password</label>
                </div>
                <button type="submit" class="btn btn-primary custom-btn">Submit</button>
            </form>
            </div>
        </div>
    </div>

        
<!-- 
        <script src="login&register.js">
        </script> -->

    </body>
</html>                