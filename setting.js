var tasksRef;
var userRef;

document.addEventListener("DOMContentLoaded", function() {
  // Get a reference to the notification toggle checkbox
const notificationToggle = document.getElementById("notification-toggle");

// Get a reference to the notification text element
const notificationText = document.getElementById("notification");

// Bind the saveUserSettings function to the change event of the toggle checkbox
notificationToggle.addEventListener("change", saveUserSettings);

// Function to handle saving user's preferences
function saveUserSettings() {
  // Retrieve user preferences from the UI
  const notificationToggle = document.getElementById("notification-toggle");

  // Create an object with the user's preferences
  const userSettings = {
    notifications: notificationToggle.checked,
  };

  // Get the current user's ID (assuming you have user authentication implemented)
  const userId = firebase.auth().currentUser.uid;

  // Save the preferences to the Firebase database
  // Get a reference to the Firebase Realtime Database
var database = firebase.database();

  database
    .ref("users/" + userId + "/settings")
    .set(userSettings)
    .then(() => {
      // Update the text based on the toggle state
      if (notificationToggle.checked) {
        notificationText.textContent = "Notifications enabled";
      } else {
        notificationText.textContent = "Notifications disabled";
      }

      // Provide feedback to the user
      alert("Settings saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving settings:", error);
    });
}

// Get a reference to the feedback form rating inputs
const ratingInputs = document.querySelectorAll('input[name="rating"]');

// Function to handle saving user's feedback rating
function saveFeedbackRating() {
  // Retrieve user feedback rating from the UI
  let rating;
  for (const input of ratingInputs) {
    if (input.checked) {
      rating = input.value;
      break;
    }
  }

  // Get the current user's ID (assuming you have user authentication implemented)
  const userId = firebase.auth().currentUser.uid;

  // Save the feedback rating to the Firebase database
  var database = firebase.database();
  database
    .ref("ratings/")
    .child(userId)
    .set(rating)
    .then(() => {
      // Provide feedback to the user
      alert("Feedback rating saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving feedback rating:", error);
    });
}

// Call the saveFeedbackRating function when a rating input is clicked
ratingInputs.forEach((input) => {
  input.addEventListener("click", saveFeedbackRating);
});

// Function to retrieve the user's current notification preference from the database
function retrieveUserSettings() {
  const user = firebase.auth().currentUser;

  if (user) {
    // Get the current user's ID
    const userId = user.uid;

    // Get the user settings from the Firebase database
    database
      .ref("users/" + userId + "/settings")
      .once("value")
      .then((snapshot) => {
        const userSettings = snapshot.val();
        updateNotificationUI(userSettings);
      })
      .catch((error) => {
        console.error("Error retrieving user settings:", error);
      });
  } else {
    // User is not authenticated, handle the case accordingly
    console.log("User is not authenticated");
  }
}

// Function to update the UI based on the user's notification settings
function updateNotificationUI(userSettings) {
  if (userSettings && userSettings.notifications) {
    notificationToggle.checked = true;
    notificationText.textContent = "Notifications enabled";
  } else {
    notificationToggle.checked = false;
    notificationText.textContent = "Notifications disabled";
  }
}

// Call the function to retrieve user settings when needed
retrieveUserSettings();

  auth.onAuthStateChanged((currentUser) => {
    let user;
    if (currentUser) {
      // User is signed in
      user = currentUser;
      const uid = user.uid;
      tasksRef = db.ref(`Tasks/${uid}`);
      userRef = db.ref(`users/${uid}`);
  
      console.log("User UID:", uid);
      // Call function
      displayProfile(user);
    } else {
      // User is signed out
      console.log("No user signed in");
      tasksRef = null;
    }
  });
  
  // // display profile
  // function displayProfile(user) {
  //   var email = document.getElementById("email");
  //   var user = document.getElementById("username");
  //   var display = document.getElementById("dispname");
  
  //   userRef.on(
  //     "value",
  //     (snapshot) => {
  //       console.log(snapshot.val());
  //       const name = snapshot.val().username;
  //       const profile = snapshot.val().imageUrl;
  //       const image = document.getElementById("profileImage");
  //       user.value = name;
  //       email.value = mail;
  //       display.innerHTML = name;
  //       if (profile) {
  //         image.src = profile;
  //       }
  //     },
  //     (errorObject) => {
  //       console.log("The read failed: " + errorObject.name);
  //     }
  //   );
  // }

}); 

function snapshotToArray(snapshot) {
  const array = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;
    const val = childSnapshot.val();
    array.push({ key, val });
  });
  return array;
}

 // Display profile
 function displayProfile() {
  var email = document.getElementById("email");
  var accountUsername = document.getElementById("username");
  var profileImage = document.getElementById("profileImageUrl");

  userRef.on(
    "value",
    (snapshot) => {
      const username = snapshot.val().username;
      const profileImageUrl = snapshot.val().imageUrl;

      accountUsername.innerHTML = username;
      
      if (profileImageUrl) {
        profileImage.src = profileImageUrl;
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
}