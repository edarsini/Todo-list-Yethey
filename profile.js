let tasksRef;

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    tasksRef = db.ref(`Tasks/${uid}`);

    console.log("User UID:", uid);
    // Call function
    showTasks();
    progressbar();
  } else {
    // User is signed out
    console.log("No user signed in");
    tasksRef = null;
  }
});


// function to update Details
document.addEventListener("DOMContentLoaded", function () {
  // Get the updateAccount button element
  var updateAcc = document.getElementById("updateAccount");

  // Add click event listener to the button
  updateAcc.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the input field values
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var descp = document.getElementById("descp").value;

    // Create an object to hold the user details
    var userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      descp: descp,
    };

    // Save the user details to local storage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Clear the input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("descp").value = "";

    // Display a success message or perform any other desired actions
    alert("User details updated successfully!");
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
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("descp").value = "";

    // Display a success message or perform any other desired actions
    alert("Changes Cancelled");
  });
});

// test value for oldpassword
let password = "test";
// function to update password
var updatePassButton = document.getElementById("updatePass");

// Add click event listener to the updatePass button
updatePassButton.addEventListener("click", function () {
  // Get the new password input element
  var newPasswordInput = document.getElementById("newPass");

  // Get the old password input element
  var oldPasswordInput = document.getElementById("oldPass");

  // Get the confirm password input element
  var confirmPasswordInput = document.getElementById("confirmPass");

  // Get the password from local storage
  // var storedPassword = localStorage.getItem('password');
  // test valur for stored password
  var storedPassword = password;

  // Check if the old password is incorrect
  if (oldPasswordInput.value !== storedPassword) {
    // Display error message
    alert("Incorrect old password!");
    return;
  }

  // Check if any field is empty
  if (
    newPasswordInput.value === "" ||
    oldPasswordInput.value === "" ||
    confirmPasswordInput.value === ""
  ) {
    // Display error message
    alert("Please fill in all fields!");
    return;
  }

  // Check if the new password and confirm password match
  if (newPasswordInput.value !== confirmPasswordInput.value) {
    // Display error message
    alert("New password and confirm password do not match!");
    return;
  }

  // Update the password in local storage
  localStorage.setItem("password", newPasswordInput.value);

  // Display success message
  alert("Password updated successfully!");

  // Clear the input fields
  newPasswordInput.value = "";
  oldPasswordInput.value = "";
  confirmPasswordInput.value = "";
});

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

var deleteAccBtn = document.getElementById("deleteAcc");

// Add click event listener to the updatePass button
deleteAccBtn.addEventListener("click", function () {
  // Delete acc from local storage
  alert("Successfully deleted Account");

  window.location.replace("index.html");
});
