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


const registerFunction = e => {
    let username = document.getElementById('username').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

        let formData = JSON.parse(localStorage.getItem('formData')) || [];

        let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => 
            data.username.toLowerCase() == username.toLowerCase());
            
        if(!exist){
            formData.push({ username, email, pwd });
            localStorage.setItem('formData', JSON.stringify(formData));
            alert("Account Created.\n\nPlease Log In.");
            console.log(formData);
            document.querySelector('form').reset();
            document.getElementById('loginUsername').focus();
        }
        else{
            alert("Ooopppssss... Duplicate found!!!\nYou have already registered");
        }
            e.preventDefault();
}
    
function loginFunction(e) {
    let loginUsername = document.getElementById('loginUsername').value, pwd = document.getElementById('pwd').value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.username.toLowerCase() == loginUsername && data.pwd.toLowerCase() == loginPassword);
    if(!exist){
        alert("Incorrect login credentials");
        console.log('login not successful');
    }
    else{
        location.href = "notes.html";
        alert("Welcome Back!");
        console.log('login successful');
    }
    e.preventDefault();
}