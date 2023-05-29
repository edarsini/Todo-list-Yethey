<?php
session_start();

    include("connections.php");
    include("functions.php");

    $user_data = check_login($con);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To Do List Yethey!</title>
  <link rel="stylesheet" href="app.css">
  <script src="setting.js"></script>
  <!--Bootstrap CSS-->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

</head>

    <body>
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id="main-nav">
          <div class="container-fluid">
            <a class="navbar-brand" href="#" style="font-size: x-large;font-weight: bold;font-family: cursive;">Yethey! To-Do List</a>
            <div class="collapse navbar-collapse float-right" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link" aria-current="page" href="notes.html">Notes</a>
                <a class="nav-link" href="profile.html">Profile</a>
                <a class="nav-link active" href="settings.html">Settings</a>
                <a class="nav-link" href="logout.html">Logout</a>
              </div>
              <div class = "toggle"></div>
            </div>
          </div>
        </nav>
      <section class="text-black mt-3 p-5">
      <div class="container1">
      <a href="profile.html" style="text-decoration: none;">
      <div style="display: flex; align-items: center;">
        <img src="images.png" alt="profile picture" style="margin-right: 10px;" width="50px" height="50px">
        <h3>Account User Name</h3>
      </div>
      </a>
      <hr/>
      
      <div>
        <h3>Help & Feedback</h3>
        <h5>Rate Us!</h5>
        <div class="rating">
          <input type="radio" id="star1" name="rating" value="1" />
          <label for="star1">&#9733;</label>
          <input type="radio" id="star2" name="rating" value="2" />
          <label for="star2">&#9733;</label>
          <input type="radio" id="star3" name="rating" value="3" />
          <label for="star3">&#9733;</label>
          <input type="radio" id="star4" name="rating" value="4" />
          <label for="star4">&#9733;</label>
          <input type="radio" id="star5" name="rating" value="5" />
          <label for="star5">&#9733;</label>
        </div> 
      </div>      
      <hr/>

      <div>
        <h3>Notifications</h3>
        <label class="switch">
          <div class="slider-container">
          <input type="checkbox" id="notification-toggle">
          <span class="slider round"></span>
          </div>
          <h5 id="notification">Notifications disabled</h5>
        </label>
        <!-- incomplete -->
      </div>
      <hr/>
      
      <div>
        <h3>Connect with us</h3>
        <div class="social-media">
          <img src="fb-icon.png" alt="Facebook" width="25px" height="25px">
          <a href="https://www.facebook.com" target="_blank">Facebook</a>
        </div>
        <div class="social-media">
          <img src="IG-logo.png" alt="Instagram" width="25px" height="25px">
          <a href="https://www.instagram.com" target="_blank">Instagram</a>
        </div>
      </div>
      
      <p>Thanks for visiting!</p>
    </div>
      <footer>
        <div class="container">
            <!--<i> : italic-->
            <!--<p class="fst-italic">Italic text.</p>-->
            <hr/>
            <p class="text-center"><em>Copyright &copy; 2023 To Do List Yethey!&nbsp;
            <!--<a href="mailto:khiruba@sangkari.com">khiruba@sangkari.com</a></em></p>-->
        </div>   
      </section>                 
        </footer>
    </div>
    <!-- Include Bootstrap Javascript plugin-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <script type="text/javascript" src="theme.js"></script>
    <script type="text/javascript" src="setting.js"></script>
    </body>
</html>
