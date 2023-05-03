showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
	let addTxt = document.getElementById("addTxt");
	const radioButtons = document.querySelectorAll('input[name="priority"]');
	let notes = localStorage.getItem("notes");
	let selectedPriority;
	for(const radioButton of radioButtons) {
		if(radioButton.checked){
			selectedPriority = radioButton;
			break;
		}
	}

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);
	notesObj.push({
		text: addTxt.value,
		priority: selectedPriority.value
	});
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addTxt.value = "";

	showNotes();
});

// Function to show elements from localStorage
function showNotes() {
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	let html = "";

	notesObj.forEach(function(note, index) {
		let priorityImg = "";
		if (note.priority === "high"){
			priorityImg = "high.png";
		} else if (note.priority === "medium"){
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

				<button id="${index}" onclick=
					"deleteNote(this.id)"
					class="btn btn-primary">
					Delete Note
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

// Function to delete a note
function deleteNote(index) {
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	notesObj.splice(index, 1);

	localStorage.setItem("notes",
		JSON.stringify(notesObj));

	showNotes();
}
