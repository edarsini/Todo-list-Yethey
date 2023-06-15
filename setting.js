// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAhrqyYLt1Xf-EXCAA-rkAROpB8h9PJvg",
  authDomain: "task-it-aa92b.firebaseapp.com",
  databaseURL: "https://task-it-aa92b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "task-it-aa92b",
  storageBucket: "task-it-aa92b.appspot.com",
  messagingSenderId: "704129947151",
  appId: "1:704129947151:web:65be9515384b4b0462357a",
  measurementId: "G-231G5FKB49"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the Firebase database
const database = firebase.database();

// Get a reference to the notification toggle checkbox
const notificationToggle = document.getElementById("notification-toggle");

// Bind the saveUserSettings function to the change event of the toggle checkbox
notificationToggle.addEventListener("change", saveUserSettings);

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

  // Get the current user's ID (assuming you have user authentication implemented)
  const userId = firebase.auth().currentUser.uid;

  // Save the preferences to the Firebase database
  database.ref("users/" + userId + "/settings").set(userSettings)
    .then(() => {
      // Update the text based on the toggle state
      const notificationText = document.getElementById("notification");
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