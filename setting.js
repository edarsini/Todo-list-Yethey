// window.addEventListener('load', function(){
//   notificationToggle = document.getElementById('notification-toggle');
//   notificationText = document.getElementById('notification');
//   alertShown = false; // Track if alert has been shown

//   notificationToggle.addEventListener('change', function() {
//     if (this.checked) {
//       // User has enabled notifications
//       Notification.requestPermission().then(function(permission) {
//         if (permission === 'granted') {
//           notificationText.innerText = 'Notifications enabled';
//           notificationToggle.checked = true;
//         } 
//         else {
//           // Show alert only if it hasn't been shown before
//           if (!alertShown) {
//             alert("To enable notifications, please go to your browser settings and allow notifications for this website.");
//             alertShown = true;
//           }
//           notificationText.innerText = 'Notifications disabled';
//           notificationToggle.checked = false;
//           Notification.permission = 'denied';
//         }
//       });
//     }
//     else {
//       notificationText.innerText = 'Notifications disabled';
//       notificationToggle.checked = false;
//       Notification.permission = 'denied';
//     }
//   });
// });

// //rating bar
// rating = document.getElementsByName('rating');

// function setRatingValue() {
//   let ratingValue;
//   for (let i = 0; i < rating.length; i++) {
//     if (rating[i].checked) {
//       ratingValue = rating[i].value;
//       break;
//     }
//   }
//   console.log(ratingValue); // this will log the selected rating value to the console
// }

// for (let i = 0; i < rating.length; i++) {
//   rating[i].addEventListener('click', setRatingValue);
// }


//firebase database

// setting.js

// Function to handle saving user's preferences

function saveUserSettings() {
  // Retrieve user preferences from the UI
  const notificationToggle = document.getElementById("notification-toggle");
  const ratingValue = document.querySelector('input[name="rating"]:checked').value;

  // Create an object with the user's preferences
  const userSettings = {
    notifications: notificationToggle.checked,
    rating: ratingValue,
  };

  // Save the preferences to local storage
  localStorage.setItem("userSettings", JSON.stringify(userSettings));

  // Provide feedback to the user
  alert("Settings saved successfully!");
}

// Function to load user's preferences from local storage
function loadUserSettings() {
  const storedSettings = localStorage.getItem("userSettings");
  if (storedSettings) {
    const userSettings = JSON.parse(storedSettings);

    // Apply the user's preferences to the UI
    const notificationToggle = document.getElementById("notification-toggle");
    notificationToggle.checked = userSettings.notifications;

    const ratingInput = document.querySelector(`input[name="rating"][value="${userSettings.rating}"]`);
    if (ratingInput) {
      ratingInput.checked = true;
    }
  }
}

// Call the function to load user's preferences when the page loads
window.addEventListener("DOMContentLoaded", loadUserSettings);
