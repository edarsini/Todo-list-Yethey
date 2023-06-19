// //theme
// body = document.querySelector("body");
// toggle = document.querySelector(".toggle");

// if (toggle) {
//   getMode = localStorage.getItem("mode");
//   if(getMode && getMode==="dark"){
//     body.classList.add("dark");
//     toggle.classList.add("active");
//   }

//   toggle.addEventListener("click", () => {
//     body.classList.toggle("dark");

//     if(!body.classList.contains("dark")){
//       return localStorage.setItem("mode", "light");
//     }
//     localStorage.setItem("mode", "dark");
//   });
//   toggle.addEventListener("click", () => toggle.classList.toggle("active"));
// }

var tasksRef;
var userRef;

document.addEventListener("DOMContentLoaded", function() {
  // Get references to the necessary elements
  const body = document.querySelector("body");
  const toggle = document.querySelector(".toggle");

  if (toggle) {
    // Retrieve user's theme preference from the database
    const userId = auth.currentUser.uid;
    db.ref("users/" + userId + "/themePreference")
      .once("value")
      .then((snapshot) => {
        const themePreference = snapshot.val();

        if (themePreference && themePreference === "dark") {
          body.classList.add("dark");
          toggle.classList.add("active");
        }
      })
      .catch((error) => {
        console.error("Error retrieving theme preference:", error);
      });

    // Toggle theme preference and update the database
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      const newThemePreference = body.classList.contains("dark") ? "dark" : "light";

      // Update theme preference in the database
      db.ref("users/" + userId + "/themePreference")
        .set(newThemePreference)
        .then(() => {
          console.log("Theme preference updated to", newThemePreference);
        })
        .catch((error) => {
          console.error("Error updating theme preference:", error);
        });

      toggle.classList.toggle("active");
    });
  }
});
