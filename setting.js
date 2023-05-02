// // Get the radio buttons for the theme selection
// themeRadios = document.querySelectorAll('input[name="theme"]');

// // Get the body element
// body = document.body;

// // Retrieve the user's preferred theme from localStorage
// preferredTheme = localStorage.getItem('preferredTheme');

// // Set the body's theme class based on the user's preferred theme (if available)
// if (preferredTheme) {
//   body.classList.add(`theme-${preferredTheme}`);
// }

// // Add a change event listener to each radio button
// for ( radio of themeRadios) {
//   radio.addEventListener('change', function() {
//     // Check if the radio button is checked
//     if (this.checked) {
//       // Remove any existing theme classes from the body element
//       body.classList.remove('theme-light', 'theme-dark');
      
//       // Add the new theme class to the body element
//       body.classList.add(`theme-${this.value}`);
      
//       // Save the user's preferred theme to localStorage
//       localStorage.setItem('preferredTheme', this.value);
//     }
//   });
// }

var themeName = "dark";

document.cookie = "theme=" + themeName;

// Read the "theme" cookie and apply the selected theme
var theme = getCookie("theme");
if (theme === "dark") {
  document.body.classList.add("theme-dark");
}

function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}



if (Notification.permission === "granted") {
  var notification = new Notification("Test Notification", { 
    body: "This is a test notification.", 
    icon: "https://example.com/icon.png" 
  });
}
if ("Notification" in window) {
  // If notifications are supported, show the notification radio buttons
  notificationEnable = document.getElementById("notification-enable");
  notificationDisable = document.getElementById("notification-disable");
  if (notificationEnable != null && notificationDisable != null) {
    notificationEnable.style.display = "inline-block";
    notificationDisable.style.display = "inline-block";
    
    // Check the current permission status and update the radio button states
    if (Notification.permission === "granted") {
      notificationEnable.checked = true;
      notificationDisable.checked = false;
    } else {
      notificationEnable.checked = false;
      notificationDisable.checked = true;
    }
    
    // Add event listeners to the notification radio buttons
    notificationEnable.addEventListener("click", function() {
      if (Notification.permission !== "granted") {
        // Request permission to show notifications
        Notification.requestPermission().then(function(permission) {
          if (permission === "granted") {
            // Notifications are allowed, update the radio button states
            notificationEnable.checked = true;
            notificationDisable.checked = false;
          }
        });
      }
    });
    
    notificationDisable.addEventListener("click", function() {
      if (Notification.permission === "granted") {
        // Disable notifications
        Notification.permission = "denied";
        notificationEnable.checked = false;
        notificationDisable.checked = true;
      }
    });
  }
}
