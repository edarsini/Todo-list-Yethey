var tasksRef;
var userRef;

// Function to send password reset email
function sendPasswordResetEmail() {
  firebase
    .auth()
    .sendPasswordResetEmail(user.email)
    .then(() => {
      // Password reset email sent successfully
      alert("Password reset email sent. Please check your inbox.");
    })
    .catch((error) => {
      // An error occurred while sending the password reset email
      console.log(error);
      alert("Failed to send password reset email. Please try again.");
    });
}

auth.onAuthStateChanged((currentUser) => {
  if (currentUser) {
    // User is signed in
    user = currentUser;
    const uid = user.uid;
    tasksRef = db.ref(`Tasks/${uid}`);
    userRef = db.ref(`users/${uid}`);

    console.log("User UID:", uid);
    // Call function

    showTasks();
    progressbar();
    displayProfile(user);
  } else {
    // User is signed out
    console.log("No user signed in");
    tasksRef = null;
  }
});

// function to update Details
// function to update Details
document.addEventListener("DOMContentLoaded", function () {
  // Get the updateAccount button element
  var updateAcc = document.getElementById("updateAccount");

  // Add click event listener to the button
  updateAcc.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the input field values
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    userRef.update({
      username: username,
      email: email,
    });

    // Update the user's email
    user
      .updateEmail(email)
      .then(() => {
        // Clear the input fields
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";

        // Display a success message or perform any other desired actions
        alert("User details and email updated successfully!");
      })
      .catch((error) => {
        // Handle the error if updating the email fails
        console.log(error.message);
        alert(
          "Failed to update email. Please try again. \nError Message: " +
            error.message
        );
      });
  });
});

// cancel button for account
document.addEventListener("DOMContentLoaded", function () {
  // Get the updateAccount button element
  var cancelAcc = document.getElementById("cancelAcc");

  // Add click event listener to the button
  cancelAcc.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Clear the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";

    // Display a success message or perform any other desired actions
    alert("Changes Cancelled");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the resetPass button element
  var resetPassBtn = document.getElementById("resetPass");

  // Add click event listener to the button
  resetPassBtn.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Check if the user is authenticated and has an email
    if (user && user.email) {
      // Call the function to send password reset email
      sendPasswordResetEmail();
    } else {
      // User is not authenticated or does not have an email
      alert("User email not available. Please try again.");
    }
  });
});
// delete acc
document.addEventListener("DOMContentLoaded", function () {
  // Get the deleteAcc button element
  var deleteAcc = document.getElementById("deleteAcc");

  // Add click event listener to the button
  deleteAcc.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Check if the user is authenticated
    if (user) {
      // Delete the user account
      user
        .delete()
        .then(() => {
          // User account deleted successfully
          alert("Your account has been deleted.");

           // Replace the current URL with a new URL
           history.replaceState(null, null, "/index.html");

           // Redirect the user to the account-deleted.html page
           window.location.href = "/index.html";
        })
        .catch((error) => {
          // An error occurred while deleting the user account
          console.log(error);
          alert("Failed to delete your account. Please try again.");
        });
    } else {
      // User is not authenticated
      alert("User not available. Please try again.");
    }
  });
});

// test value for oldpassword

// // cancel button for account
// document.addEventListener("DOMContentLoaded", function () {
//   // Get the updateAccount button element
//   var cancelPassBtn = document.getElementById("cancelPass");

//   // Add click event listener to the button
//   cancelPassBtn.addEventListener("click", function (event) {

//     // Clear the input fields
//     newPasswordInput.value = "";
//     oldPasswordInput.value = "";
//     confirmPasswordInput.value = "";

//     // Display a success message or perform any other desired actions
//     alert("Changes Cancelled");
//   });
// });

function showTasks() {
  tasksRef.on("value", (snapshot) => {
    let overdueHTML = "";
    let duesoonHTML = "";

    // Convert the snapshot to an array
    const tasksArray = snapshotToArray(snapshot);

    // Sort the tasks based on priority
    tasksArray.sort((taskA, taskB) => {
      return (
        priorityValues[taskB.val.priority] - priorityValues[taskA.val.priority]
      );
    });

    // Get the current date
    const currentDate = new Date();

    // Iterate over each sorted task
    tasksArray.forEach((task) => {
      const taskId = task.key;
      const taskData = task.val;
      // Set image based on priority
      priorityImg = priorityImage(taskData);
      // Change the class of move button if the status is Completed
      const moveButtonClass =
        taskData.status === "Completed" ? "done-button" : "move-button";

      if (taskData.status === "Completed") {
        return;
      }

      // Get the task's due date as a Date object
      const taskDueDate = new Date(taskData.date);

      // Define the number of days considered as "due soon"
      const dueSoonDays = 2;

      // Calculate the due date for "due soon" tasks
      const dueSoonDate = new Date();
      dueSoonDate.setDate(currentDate.getDate() + dueSoonDays);

      // Compare the task's due date with the current date
      if (taskDueDate < currentDate) {
        // Task is overdue
        // Create the task cards for overdue tasks
        const taskCard = `<div class="noteCard my-2 mx-2 card"
          style="max-width: 16rem; width: 100%; border-radius: 10px; border: 1px solid #666666;">
          <div class="card-body">
            <h5 class="card-title">
              <img src="${priorityImg}">
            </h5>
            <p class="card-text">
              ${taskData.text}
            </p>
            <p class="card-text" style="color: #666666;">
              Due ${taskData.date}
            </p>
          </div>
        </div>`;

        // Add the task card to the appropriate HTML element for overdue tasks
        overdueHTML += taskCard;
      } else if (taskDueDate <= dueSoonDate) {
        // Task is due soon or not yet due
        // Create the task cards for due soon or not yet due tasks
        const taskCard = `<div class="noteCard my-2 mx-2 card"
          style="max-width: 16rem; width: 100%; border-radius: 10px; border: 1px solid #666666;">
          <div class="card-body">
            <h5 class="card-title">
              <img src="${priorityImg}">
            </h5>
            <p class="card-text">
              ${taskData.text}
            </p>
            <p class="card-text" style="color: #666666;">
              Due ${taskData.date}
            </p>
          </div>
        </div>`;
        duesoonHTML += taskCard;
      }

      if (taskDueDate < currentDate) {
        let overDue = document.getElementById("overDue");
        overDue.innerHTML = overdueHTML;
      } else {
        let dueSoon = document.getElementById("dueSoon");
        dueSoon.innerHTML = duesoonHTML;
      }
    });
  });
}

function progressbar() {
  tasksRef.on("value", (snapshot) => {
    let numberOfTodo = 0;
    let numberOfProgress = 0;
    let numberOfComplete = 0;

    snapshot.forEach((childSnapshot) => {
      const taskData = childSnapshot.val();
      if (taskData.status === "Todo") {
        numberOfTodo++;
      } else if (taskData.status == "InProgress") {
        numberOfProgress++;
      } else numberOfComplete++;
    });

    const numChildNodes = snapshot.numChildren();

    let todoBar = (numberOfTodo / numChildNodes) * 100;
    let inProgressBar = (numberOfProgress / numChildNodes) * 100;
    let completeBar = (numberOfComplete / numChildNodes) * 100;

    const tasksNotStarted = document.getElementById("tasksNotStarted");
    tasksNotStarted.innerHTML = `
    <div class="h4">Tasks Not Started</div>
      <div class="progress">
        <div class="progress-bar progress-bar-striped bg-danger"
          role="progressbar"
          style="width: ${todoBar}%"
          aria-valuenow="${todoBar}"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>`;

    const tasksInProgress = document.getElementById("tasksInProgress");
    tasksInProgress.innerHTML = `
    <div class="h4">Tasks In Progress</div>
      <div class="progress">
        <div class="progress-bar progress-bar-striped bg-warning"
          role="progressbar"
          style="width: ${inProgressBar}%"
          aria-valuenow="${inProgressBar}"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>`;

    const tasksComplete = document.getElementById("tasksCompleted");
    tasksComplete.innerHTML = `
    <div class="h4">Tasks Completed</div>
      <div class="progress">
        <div class="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style="width: ${completeBar}%"
          aria-valuenow="${completeBar}"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>`;
  });
}

function snapshotToArray(snapshot) {
  const array = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;
    const val = childSnapshot.val();
    array.push({ key, val });
  });
  return array;
}

// Function to set Image according to Priority
function priorityImage(data) {
  let priorityImg = "";

  switch (data.priority) {
    case "high":
      priorityImg = "high.png";
      break;
    case "medium":
      priorityImg = "medium.png";
      break;
    default:
      priorityImg = "low.png";
      break;
  }

  return priorityImg;
}
// display profile
function displayProfile(user) {
  var email = document.getElementById("email");
  var user = document.getElementById("username");
  var display = document.getElementById("dispname");

  userRef.on(
    "value",
    (snapshot) => {
      console.log(snapshot.val());
      const name = snapshot.val().username;
      const mail = snapshot.val().email;
      const profile = snapshot.val().imageUrl;
      const image = document.getElementById("profileImage");
      user.value = name;
      email.value = mail;
      display.innerHTML = name;
      if (profile) {
        image.src = profile;
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
}

// for user to upload files
function handleFileUpload(event) {
  const file = event.target.files[0];
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child("images/" + file.name);

  fileRef
    .put(file)
    .then(() => {
      return fileRef.getDownloadURL();
    })
    .then((url) => {
      const image = document.getElementById("profileImage");
      console.log(url);
      image.src = url;

      userRef
        .child("imageUrl")
        .set(url)
        .then(() => {
          console.log("Image URL updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating image URL:", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

var deleteAccBtn = document.getElementById("deleteAcc");

// Add click event listener to the updatePass button
deleteAccBtn.addEventListener("click", function () {
  // Delete acc from local storage
  alert("Successfully deleted Account");

  window.location.replace("index.html");
});
