window.addEventListener('load', function(){
  var notificationToggle = document.getElementById('notification-toggle');
  var notificationText = document.getElementById('notification');
  var alertShown = false; // Track if alert has been shown

  notificationToggle.addEventListener('change', function() {
    if (this.checked) {
      // User has enabled notifications
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          notificationText.innerText = 'Notifications enabled';
          notificationToggle.checked = true;
        } 
        else {
          // Show alert only if it hasn't been shown before
          if (!alertShown) {
            alert("To enable notifications, please go to your browser settings and allow notifications for this website.");
            alertShown = true;
          }
          notificationText.innerText = 'Notifications disabled';
          notificationToggle.checked = false;
          Notification.permission = 'denied';
        }
      });
    } 
    else {
      notificationText.innerText = 'Notifications disabled';
      notificationToggle.checked = false;
      Notification.permission = 'denied';
    }
  });
});


//theme
var themeRadios = document.querySelectorAll('input[name="theme"]');
var themeValue = localStorage.getItem('theme') || 'light'; // get the saved theme value or default to light

// set the appropriate radio button as checked based on the saved theme value
for (var i = 0; i < themeRadios.length; i++) {
  if (themeRadios[i].value === themeValue) {
    themeRadios[i].checked = true;
    break;
  }
}

// function to handle theme change
function handleThemeChange(event) {
  console.log('handleThemeChange called');
  var theme = event.target.value;
  document.documentElement.setAttribute('data-theme', theme); // set the data-theme attribute on the html element
  localStorage.setItem('theme', theme); // save the theme value to local storage
}

// add event listeners to the radio buttons to handle theme change
for (var i = 0; i < themeRadios.length; i++) {
  themeRadios[i].addEventListener('change', handleThemeChange);
}

body = document.querySelector("body");
toggle = document.querySelector(".toggle");

getMode = localStorage.getItem("mode");
if(getMode && getMode==="dark"){
  body.classList.add("dark");
  toggle.classList.add("active");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if(!body.classList.contains("dark")){
    return localStorage.setItem("mode", "light");
  }
  localStorage.setItem("mode", "dark");
});

toggle.addEventListener("click", () => toggle.classList.toggle("active"));

//rating bar
rating = document.getElementsByName('rating');

function setRatingValue() {
  let ratingValue;
  for (let i = 0; i < rating.length; i++) {
    if (rating[i].checked) {
      ratingValue = rating[i].value;
      break;
    }
  }
  console.log(ratingValue); // this will log the selected rating value to the console
}

for (let i = 0; i < rating.length; i++) {
  rating[i].addEventListener('click', setRatingValue);
}
