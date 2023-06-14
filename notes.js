// // Firebase Configurations
// const firebaseConfig = {
//   apiKey: "AIzaSyCAhrqyYLt1Xf-EXCAA-rkAROpB8h9PJvg",
//   authDomain: "task-it-aa92b.firebaseapp.com",
//   databaseURL:
//     "https://task-it-aa92b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "task-it-aa92b",
//   storageBucket: "task-it-aa92b.appspot.com",
//   messagingSenderId: "704129947151",
//   appId: "1:704129947151:web:65be9515384b4b0462357a",
//   measurementId: "G-231G5FKB49",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // Initialize Realtime Database
// const db = firebase.database();
// const tasksRef = db.ref("Tasks");
// Initializing priority values
// const priorityValues = {
//   high: 3,
//   medium: 2,
//   low: 1,
// };
// Setting Due Date automatically to next day
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(currentDate.getDate() + 1);
const formattedNextDay = nextDay.toISOString().split("T")[0];

document.getElementById("taskDate").value = formattedNextDay;

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  addTask();
});

let tasksRef; // Declare tasksRef

  // Listen for authentication state changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      tasksRef = db.ref(`Tasks/${uid}`);
  
      console.log("User UID:", uid);
      // Call function
      showTasks();
    } else {
      // User is signed out
      console.log("No user signed in");
      tasksRef = null;
    }
  });

// Function to show and display tasks
function showTasks() {
  if (!tasksRef) {
    console.log("tasksRef is not available");
    return;
  }
  tasksRef.on("value", (snapshot) => {
    let TodoHTML = "";
    let InProgressHTML = "";
    let CompletedHTML = "";

    // Convert the snapshot to an array
    const tasksArray = snapshotToArray(snapshot);

    // Sort the tasks based on priority
    tasksArray.sort((taskA, taskB) => {
      return (
        priorityValues[taskB.val.priority] - priorityValues[taskA.val.priority]
      );
    });

    // Iterate over each sorted task
    tasksArray.forEach((task) => {
      const taskId = task.key;
      const taskData = task.val;
      // Set image based on priority
      priorityImg = priorityImage(taskData);
      // Change the class of move button if the status is Completed
      const moveButtonClass =
        taskData.status === "Completed" ? "done-button" : "move-button";
      // Create the task cards
      const taskCard = `<div class="noteCard my-2 mx-2 card"
        style="max-width: 16rem; width: 100%; border-radius: 10px; border: 1px solid #666666;">
        <div class="card-body">
          <button id="${taskId}" onclick="editTask('${taskId}')" class="edit-button"></button>
          <button id="${taskId}" onclick="deleteTask('${taskId}')" class="delete-button"></button>
          <h5 class="card-title">
            <img src="${priorityImg}">
          </h5>
          <p class="card-text">
            ${taskData.text}
          </p>
          <p class="card-text" style="color: #666666;">
            Due ${taskData.date}
          </p>
          <button id="${taskId}" onclick="updateTaskStatus('${taskId}', '${taskData.status}')"
            class="${moveButtonClass}"></button>
        </div>
      </div>`;

      // Check the task status and add the task card to the correct HTML element
      switch (taskData.status) {
        case "Todo":
          TodoHTML += taskCard;
          break;
        case "InProgress":
          InProgressHTML += taskCard;
          break;
        case "Completed":
          CompletedHTML += taskCard;
          break;
      }
    });
    // Update the HTML of the task columns according to the status
    let taskTodo = document.getElementById("taskTodo");
    taskTodo.innerHTML = TodoHTML;

    let taskInProgress = document.getElementById("taskInProgress");
    taskInProgress.innerHTML = InProgressHTML;

    let taskCompleted = document.getElementById("taskCompleted");
    taskCompleted.innerHTML = CompletedHTML;
  });
}
// Function to convert Firebase snapshot to an array
function snapshotToArray(snapshot) {
  const array = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;
    const val = childSnapshot.val();
    array.push({ key, val });
  });
  return array;
}
// Function to delete task
function deleteTask(taskId) {
  tasksRef
    .child(taskId)
    .remove()
    .then(() => {
      console.log("Task deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
  return;
}
// Function to edit task
function editTask(taskId) {
  const newText = prompt("Enter the new task text:");

  // Update the task text in the database
  tasksRef
    .child(taskId)
    .update({
      text: newText,
    })
    .then(() => {
      // Text updated successfully
      console.log("Task text updated successfully.");
    })
    .catch((error) => {
      // An error occurred while updating the text
      console.error("Error updating task text:", error);
    });
}
// Function to update the Task Status if user clicks next
function updateTaskStatus(taskId, currentStatus) {
  let newStatus;

  if (currentStatus === "Todo") {
    newStatus = "InProgress";
  } else if (currentStatus === "InProgress") {
    newStatus = "Completed";
  } else {
    deleteTask(taskId);
    return;
  }

  tasksRef
    .child(taskId)
    .update({ status: newStatus })
    .then(() => {
      console.log("Task status updated successfully");
    })
    .catch((error) => {
      console.error("Error updating task status:", error);
    });
}
// Function to Add Task
function addTask() {
  let addTxt = document.getElementById("addTxt");
  const radioButtons = document.querySelectorAll('input[name="priority"]');
  const dueDate = document.getElementById("taskDate");
  const currentDate = new Date(); //Get the current date
  const selectedDate = new Date(dueDate.value); //Get the inputted date
  // Error message if the user inputs a date in the past
  if (selectedDate < currentDate) {
    const errorMessage = "Please select a date in the future !";
    displayErrorModal(errorMessage);
  }
  // Continues with the program if date is correct
  else {
    let selectedPriority;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedPriority = radioButton;
        break;
      }
    }

    const formattedDate = new Date(dueDate.value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    tasksRef.push({
      text: addTxt.value,
      priority: selectedPriority.value,
      date: formattedDate,
      status: "Todo",
    });
  }

  addTxt.value = "";
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
