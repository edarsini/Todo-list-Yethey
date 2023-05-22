showNotes();
//Date in the input is auto to the next day
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(currentDate.getDate() + 1);
const formattedNextDay = nextDay.toISOString().split("T")[0];
// Set the value of the input field to the next day
document.getElementById("taskDate").value = formattedNextDay;

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  const radioButtons = document.querySelectorAll('input[name="priority"]');
  const dueDate = document.getElementById("taskDate");
  const currentDate = new Date(); //Get the current date
  const selectedDate = new Date(dueDate.value); //Get the inputted date
  //Error message if the user inputs a date in the past
  if (selectedDate < currentDate) {
    const errorMessage = "Please select a date in the future !";
    displayErrorModal(errorMessage);
  }
  //Continues with the program if date is correct
  else {
    let notes = localStorage.getItem("notes");
    let selectedPriority;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedPriority = radioButton;
        break;
      }
    }

    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);
    const formattedDate = new Date(dueDate.value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    notesObj.push({
      text: addTxt.value,
      priority: selectedPriority.value,
      date: formattedDate,
    });
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }

  addTxt.value = "";

  showNotes();
});

//Function to display error message if date is in the past
function displayErrorModal(message) {
  const modal = document.getElementById("errorModal");
  const errorMessageElement = document.getElementById("errorMessage");

  errorMessageElement.textContent = message;
  modal.style.display = "block";

  // Close the modal when the close button or the outside area is clicked
  const closeButton = document.getElementsByClassName("close")[0];
  window.onclick = function (event) {
    if (event.target === modal || event.target === closeButton) {
      modal.style.display = "none";
    }
  };
}

// Function to show elements from localStorage
function showNotes() {
  showInProgress();
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  notesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  let html = "";

  notesObj.forEach(function (note, index) {
    let priorityImg = "";
    if (note.priority === "high") {
      priorityImg = "high.png";
    } else if (note.priority === "medium") {
      priorityImg = "medium.png";
    } else {
      priorityImg = "low.png";
    }

    html += `<div class="noteCard my-2 mx-2 card"
	style="max-width: 16rem; width: 100%;">
				<div class="card-body">
				<button id="${index}" onclick=
					"deleteNote(this.id)"
					class="delete-button">
				</button>
					<h5 class="card-title">
						<img src = "${priorityImg}">
					</h5>
					<p class="card-text">
						${note.text}
					</p>
					<p class="card-text" style="color: #666666;">
						Due ${note.date}
					</p>
				<button id="${index}" onclick=
					"moveNoteToInProgress(${index})"
        			class="move-button">
				</button>
			</div>
		</div>`;
  });

  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) notesElm.innerHTML = html;
  else notesElm.innerHTML = `Click "Add Task" button above to add tasks.`;
}

function moveNoteToInProgress(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  let inProgressNotes = localStorage.getItem("noteInProgress");
  if (inProgressNotes == null) {
    inProgressNotes = [];
  } else {
    inProgressNotes = JSON.parse(inProgressNotes);
  }

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  notesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  let noteToMove = notesObj.splice(index, 1)[0];
  inProgressNotes.push(noteToMove);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("noteInProgress", JSON.stringify(inProgressNotes));

  showNotes();
  showInProgress();
}

// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  notesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  notesObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

function deleteNoteFromInProgress(index) {
  let inProgressNotes = localStorage.getItem("noteInProgress");

  if (inProgressNotes == null) inProgressNotesObj = [];
  else inProgressNotesObj = JSON.parse(inProgressNotes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  inProgressNotesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  inProgressNotesObj.splice(index, 1);

  localStorage.setItem("noteInProgress", JSON.stringify(inProgressNotesObj));

  showInProgress();
}

function showInProgress() {
  showCompleted();
  let inProgressNotes = localStorage.getItem("noteInProgress");

  if (inProgressNotes == null) inProgressNotesObj = [];
  else inProgressNotesObj = JSON.parse(inProgressNotes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  inProgressNotesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  let htmlInProgressNotes = "";
  inProgressNotesObj.forEach(function (note, index) {
    let priorityImg = "";
    if (note.priority === "high") {
      priorityImg = "high.png";
    } else if (note.priority === "medium") {
      priorityImg = "medium.png";
    } else {
      priorityImg = "low.png";
    }

    htmlInProgressNotes += `<div class="noteCard my-2 mx-2 card"
	style="max-width: 16rem; width: 100%;">
				<div class="card-body">
					<h5 class="card-title">
						<img src = "${priorityImg}">
					</h5>
					<p class="card-text">
						${note.text}
					</p>
					<p class="card-text" style="color: #666666;">
						Due ${note.date}
					</p>

				<button id="${index}" onclick=
					"deleteNoteFromInProgress(this.id)"
					class="delete-button">
				</button>
				<button id="${index}" onclick=
					"moveNoteToCompleted(this.id)"
        			class="done-button">
				</button>
			</div>
		</div>`;
  });

  let inProgressNotesElm = document.getElementById("noteInProgress");

  if (inProgressNotesObj.length != 0)
    inProgressNotesElm.innerHTML = htmlInProgressNotes;
  else inProgressNotesElm.innerHTML = `No tasks in progress!`;
}

function moveNoteToCompleted(index) {
  let inProgressNotes = localStorage.getItem("noteInProgress");

  if (inProgressNotes == null) inProgressNotesObj = [];
  else inProgressNotesObj = JSON.parse(inProgressNotes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  inProgressNotesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  let noteToMove = inProgressNotesObj.splice(index, 1)[0];
  let completedNotes = localStorage.getItem("noteComplete");
  if (completedNotes == null) {
    completedNotes = [];
  } else {
    completedNotes = JSON.parse(completedNotes);
  }
  completedNotes.push(noteToMove);

  localStorage.setItem("noteInProgress", JSON.stringify(inProgressNotesObj));
  localStorage.setItem("noteComplete", JSON.stringify(completedNotes));

  showInProgress();
  showCompleted();
}

function showCompleted() {
  let completedNotes = localStorage.getItem("noteComplete");

  if (completedNotes == null) completedNotesObj = [];
  else completedNotesObj = JSON.parse(completedNotes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  completedNotesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  let htmlCompletedNotes = "";
  completedNotesObj.forEach(function (note, index) {
    let priorityImg = "";
    if (note.priority === "high") {
      priorityImg = "high.png";
    } else if (note.priority === "medium") {
      priorityImg = "medium.png";
    } else {
      priorityImg = "low.png";
    }

    htmlCompletedNotes += `<div class="noteCard my-2 mx-2 card"
	  style="max-width: 16rem; width: 100%;">
				  <div class="card-body">
					  <h5 class="card-title">
						  <img src = "${priorityImg}">
					  </h5>
					  <p class="card-text">
						  ${note.text}
					  </p>
					  <p class="card-text" style="color: #666666;">
						  Due ${note.date}
					  </p>
  
				  <button id="${index}" onclick=
					  "deleteNoteFromCompleted(this.id)"
					  class="delete-button">
				  </button>
			  </div>
		  </div>`;
  });

  let completedNotesElm = document.getElementById("noteComplete");

  if (completedNotesObj.length != 0)
    completedNotesElm.innerHTML = htmlCompletedNotes;
  else completedNotesElm.innerHTML = `No completed tasks yet!`;
}

function deleteNoteFromCompleted(index) {
  let completedNotes = localStorage.getItem("noteComplete");

  if (completedNotes == null) completedNotes = [];
  else completedNotes = JSON.parse(completedNotes);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // sort notesObj based on priority
  completedNotesObj.sort(function (a, b) {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  completedNotesObj.splice(index, 1);

  localStorage.setItem("noteComplete", JSON.stringify(completedNotesObj));

  showCompleted();
}
