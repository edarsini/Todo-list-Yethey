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


//register function
    function registerFunction(e) {
        event.preventDefault();
        console.log('working');
        for(let i=0; i<100; i++) {
            var email = document.querySelector("#email").value;
            var username = document.querySelector("#username").value;
            var pass = document.querySelector("#password").value;
    
            var user = [{
                email: email,
                username: username,
                password: pass,
            }];
    
            var json = JSON.stringify(user);
            localStorage.setItem(user, json);
            console.log('user added');
            alert("You have successfully registered an account!");
        }
    }

    //function for login
        function loginFunction(e) {
            event.preventDefault();
            console.log('123');

            var username = document.querySelector("#loginUsername").value;
            var pass = document.querySelector("#loginPassword").value;
            var result = document.querySelector("#result");

            var user = localStorage.getItem(username);
            var data = JSON.parse(user);
            console.log(data);

            if(username == data.username && pass == data.password) {
                result.innerHTML = "You have successfully logged into your account!";
                alert("You have successfully logged into your account!");
            }else if(user = !user) {
                result.innerHTML = "User does not exist!";
                alert("User does not exist!");
            }else{
                result.innerHTML = "Incorrect Password!";
                alert("Incorrect Password!");
            }
        }