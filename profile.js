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


var deleteAccBtn = document.getElementById("deleteAcc");

// Add click event listener to the updatePass button
deleteAccBtn.addEventListener("click", function () {
  // Delete acc from local storage
  alert("Successfully deleted Account");

  window.location.replace("index.html");
});