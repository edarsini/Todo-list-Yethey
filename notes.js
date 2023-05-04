showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  const radioButtons = document.querySelectorAll('input[name="priority"]');
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
  notesObj.push({
    text: addTxt.value,
    priority: selectedPriority.value,
	date: new Date().toLocaleDateString()
  });
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";

  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  showInProgress();
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  const priorityValues = {
	"high": 3,
	"medium": 2,
	"low": 1
  };

  // sort notesObj based on priority
  notesObj.sort(function(a, b) {
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
			style="width: 18rem;">
				<div class="card-body">
					<h5 class="card-title">
						Note ${index + 1}
						<img src = "${priorityImg}">
					</h5>
					<p class="card-text">
						${note.text}
					</p>
					<p class="card-text">
						${note.date}
					</p>

				<button id="${index}" onclick=
					"deleteNote(this.id)"
					class="btn btn-primary">
					Delete Note
				</button>
				<button id="${index}" onclick=
					"moveNoteToInProgress(${index})"
        			class="btn btn-primary">
    				In Progress
				</button>
			</div>
		</div>`;
  });

  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) notesElm.innerHTML = html;
  else
    notesElm.innerHTML = `Nothing to show!
		Use "Add a Note" section above to add notes.`;
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
	"high": 3,
	"medium": 2,
	"low": 1
  };

  // sort notesObj based on priority
  notesObj.sort(function(a, b) {
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
	"high": 3,
	"medium": 2,
	"low": 1
  };

  // sort notesObj based on priority
  notesObj.sort(function(a, b) {
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
	"high": 3,
	"medium": 2,
	"low": 1
  };

  // sort notesObj based on priority
  inProgressNotesObj.sort(function(a, b) {
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
	"high": 3,
	"medium": 2,
	"low": 1
  };

  // sort notesObj based on priority
  inProgressNotesObj.sort(function(a, b) {
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
			style="width: 18rem;">
				<div class="card-body">
					<h5 class="card-title">
						In Progress ${index + 1}
						<img src = "${priorityImg}">
					</h5>
					<p class="card-text">
						${note.text}
					</p>
					<p class="card-text">
						${note.date}
					</p>

				<button id="${index}" onclick=
					"deleteNoteFromInProgress(this.id)"
					class="btn btn-primary">
					Delete Note
				</button>
				<button id="${index}" onclick=
					"moveNoteToCompleted(this.id)"
        			class="btn btn-primary">
    				Done
				</button>
			</div>
		</div>`;
  });

  let inProgressNotesElm = document.getElementById("noteInProgress");

  if (inProgressNotesObj.length != 0)
    inProgressNotesElm.innerHTML = htmlInProgressNotes;
  else
    inProgressNotesElm.innerHTML = `No notes in progress!`;
}

function moveNoteToCompleted(index) {
	let inProgressNotes = localStorage.getItem("noteInProgress");
  
	if (inProgressNotes == null) inProgressNotesObj = [];
	else inProgressNotesObj = JSON.parse(inProgressNotes);

	const priorityValues = {
		"high": 3,
		"medium": 2,
		"low": 1
	  };
	
	  // sort notesObj based on priority
	  inProgressNotesObj.sort(function(a, b) {
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
		"high": 3,
		"medium": 2,
		"low": 1
	  };
	
	  // sort notesObj based on priority
	  completedNotesObj.sort(function(a, b) {
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
			  style="width: 18rem;">
				  <div class="card-body">
					  <h5 class="card-title">
						  Completed ${index + 1}
						  <img src = "${priorityImg}">
					  </h5>
					  <p class="card-text">
						  ${note.text}
					  </p>
					  <p class="card-text">
						${note.date}
					</p>
  
				  <button id="${index}" onclick=
					  "deleteNoteFromCompleted(this.id)"
					  class="btn btn-primary">
					  Delete Note
				  </button>
			  </div>
		  </div>`;
	});
  
	let completedNotesElm = document.getElementById("noteComplete");
  
	if (completedNotesObj.length != 0)
	  completedNotesElm.innerHTML = htmlCompletedNotes;
	else
	  completedNotesElm.innerHTML = `No completed notes yet!`;
  }

  function deleteNoteFromCompleted(index) {
	let completedNotes = localStorage.getItem("noteComplete");
  
	if (completedNotes == null) completedNotes = [];
	else completedNotes = JSON.parse(completedNotes);

	const priorityValues = {
		"high": 3,
		"medium": 2,
		"low": 1
	  };
	
	  // sort notesObj based on priority
	  completedNotesObj.sort(function(a, b) {
		return priorityValues[b.priority] - priorityValues[a.priority];
	  });
  
	completedNotesObj.splice(index, 1);
  
	localStorage.setItem("noteComplete", JSON.stringify(completedNotesObj));
  
	showCompleted();
  }
  
  

