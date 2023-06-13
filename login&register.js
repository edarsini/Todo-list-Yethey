//function for swapping between login & register page
var x = document.querySelector("#login");
var y = document.querySelector("#register");
var z = document.querySelector("#btn");

function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
}
//Function for state:
// const user = auth.currentUser;
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//        const uid = user.uid;
//        //window.location.href = "notes.html";

//    } else {
        // User is signed out
        // ...
//    }
//    });


// //Function for Registering a New User and saving it to local storage
// const registerFunction = e => {
//     let username = document.getElementById('username').value,
//         email = document.getElementById('email').value,
//         pwd = document.getElementById('pwd').value;

//         let formData = JSON.parse(localStorage.getItem('formData')) || [];

//         let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => 
//             data.username.toLowerCase() == username.toLowerCase());
            
//         if(!exist){
//             formData.push({ username, email, pwd });
//             localStorage.setItem('formData', JSON.stringify(formData));
//             alert("Account Created.\n\nPlease Log In.");
//             console.log(formData);
//             document.querySelector('form').reset();
//             document.getElementById('lusername').focus();
//         }
//         else{
//             alert("Ooopppssss... Duplicate found!!!\nYou have already registered");
//         }
//             e.preventDefault();
// }

// //Function for User to Log into their account and saving it to local storage
// function loginFunction(e) {
//     let lusername = document.getElementById('lusername').value, lpwd = document.getElementById('lpwd').value;
//     let formData = JSON.parse(localStorage.getItem('formData')) || [];
//     let exist = formData.length && 
//     JSON.parse(localStorage.getItem('formData')).some(data => data.username.toLowerCase() == lusername && data.pwd.toLowerCase() == lpwd);
//     if(!exist){
//         alert("Incorrect login credentials");
//         console.log('login not successful');
//     }
//     else{
//         alert("Welcome Back!");
//         console.log('login successful');
//         window.location.href = "notes.html";
//     }
//     e.preventDefault();
// }