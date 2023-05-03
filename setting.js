var notificationToggle = document.getElementById('notification-toggle');
var notificationText = document.getElementById('notification');

notificationToggle.addEventListener('change', function() {
  if (this.checked) {
    // User has enabled notifications
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        notificationText.innerText = 'Notifications enabled';
      } else {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            notificationText.innerText = 'Notifications enabled';
            notificationToggle.checked = true;
          } 
        });
        alert("Enable the notification in the browser settings or reload the page");
        notificationToggle.checked = false;
        notificationText.innerText = 'Notifications disabled';
      }
    });
  } else {
    // User has disabled notifications
    notificationText.innerText = 'Notifications disabled';
    Notification.permission = denied;
  }
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

//rating bar
const rating = document.getElementsByName('rating');

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
