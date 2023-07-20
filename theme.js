//theme
body = document.querySelector("body");
toggle = document.querySelector(".toggle");

if (toggle) {
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
}


// // var userRef;

// // document.addEventListener("DOMContentLoaded", function() {
// //   // Get references to the necessary elements
// //   const body = document.querySelector("body");
// //   const toggle = document.querySelector(".toggle");

// //   if (toggle) {
// //     // Retrieve user's theme preference from the database
// //     const userId = firebase.auth().currentUser.uid;
// //     db.ref("users/" + userId + "/themePreference")
// //       .once("value")
// //       .then((snapshot) => {
// //         const themePreference = snapshot.val();

// //         if (themePreference && themePreference === "dark") {
// //           body.classList.add("dark");
// //           toggle.classList.add("active");
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Error retrieving theme preference:", error);
// //       });

// //     // Toggle theme preference and update the database
// //     toggle.addEventListener("click", () => {
// //       body.classList.toggle("dark");

// //       const newThemePreference = body.classList.contains("dark") ? "dark" : "light";

// //       // Update theme preference in the database
// //       db.ref("users/" + userId + "/themePreference")
// //         .set(newThemePreference)
// //         .then(() => {
// //           console.log("Theme preference updated to", newThemePreference);
// //         })
// //         .catch((error) => {
// //           console.error("Error updating theme preference:", error);
// //         });

// //       toggle.classList.toggle("active");
// //     });
// //   }
// // });


// // Initialize Firebase app
// const firebaseConfig = {
//   apiKey: "AIzaSyCAhrqyYLt1Xf-EXCAA-rkAROpB8h9PJvg",
//   authDomain: "task-it-aa92b.firebaseapp.com",
//   databaseURL: "https://task-it-aa92b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "task-it-aa92b",
//   storageBucket: "task-it-aa92b.appspot.com",
//   messagingSenderId: "704129947151",
//   appId: "1:704129947151:web:65be9515384b4b0462357a",
//   measurementId: "G-231G5FKB49",
// };
// firebase.initializeApp(firebaseConfig);

// // Authenticate the user
// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then(() => {
//     // Get references to the necessary elements
//     const body = document.querySelector("body");
//     const toggle = document.querySelector(".toggle");

//     if (toggle) {
//       // Retrieve user's theme preference from the database
//       const userId = firebase.auth().currentUser.uid;
//       db.ref("users/" + userId + "/themePreference")
//         .once("value")
//         .then((snapshot) => {
//           const themePreference = snapshot.val();

//           if (themePreference && themePreference === "dark") {
//             body.classList.add("dark");
//             toggle.classList.add("active");
//           }
//         })
//         .catch((error) => {
//           console.error("Error retrieving theme preference:", error);
//         });

//       // Toggle theme preference and update the database
//       toggle.addEventListener("click", () => {
//         body.classList.toggle("dark");

//         const newThemePreference = body.classList.contains("dark") ? "dark" : "light";

//         // Update theme preference in the database
//         db.ref("users/" + userId + "/themePreference")
//           .set(newThemePreference)
//           .then(() => {
//             console.log("Theme preference updated to", newThemePreference);
//           })
//           .catch((error) => {
//             console.error("Error updating theme preference:", error);
//           });

//         toggle.classList.toggle("active");
//       });
//     }
//   })
//   .catch((error) => {
//     console.error("Error authenticating user:", error);
//   });
