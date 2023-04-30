// Get the radio buttons for the theme selection
themeRadios = document.querySelectorAll('input[name="theme"]');

// Get the body element
body = document.body;

// Retrieve the user's preferred theme from localStorage
preferredTheme = localStorage.getItem('preferredTheme');

// Set the body's theme class based on the user's preferred theme (if available)
if (preferredTheme) {
  body.classList.add(`theme-${preferredTheme}`);
}

// Add a change event listener to each radio button
for ( radio of themeRadios) {
  radio.addEventListener('change', function() {
    // Check if the radio button is checked
    if (this.checked) {
      // Remove any existing theme classes from the body element
      body.classList.remove('theme-light', 'theme-dark');
      
      // Add the new theme class to the body element
      body.classList.add(`theme-${this.value}`);
      
      // Save the user's preferred theme to localStorage
      localStorage.setItem('preferredTheme', this.value);
    }
  });
}




if (Notification.permission === "granted") {
  var notification = new Notification("Test Notification", { 
    body: "This is a test notification.", 
    icon: "https://example.com/icon.png" 
  });
}
// Check if the browser supports notifications
if ("Notification" in window) {
  // If notifications are supported, show the notification radio buttons
  var notificationEnable = document.getElementById("notification-enable");
  var notificationDisable = document.getElementById("notification-disable");
  notificationEnable.style.display = "inline-block";
  notificationDisable.style.display = "inline-block";

  // Check the current permission status
  if (Notification.permission === "granted") {
    // Notifications are already allowed, set the "Enable Notifications" radio button to checked
    notificationEnable.checked = true;
  } else {
    // Notifications are not allowed, set the "Disable Notifications" radio button to checked
    notificationDisable.checked = true;
  }
  
  // Add event listeners to the notification radio buttons
  notificationEnable.addEventListener("click", function() {
    if (Notification.permission !== "granted") {
      // Notifications are not allowed, request permission
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
      // Notifications are already allowed, disable them
      Notification.permission = "denied";
      notificationEnable.checked = false;
      notificationDisable.checked = true;
    }
  });
}
