/* EVENTS */
window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");

    if(window.scrollY >= window.innerHeight - 60){
        nav.style.backgroundColor = "#233434";
    } else {
        nav.style.backgroundColor = "transparent"; 
    }
});


/* Form Header Click & Change Events */
let btnHeaderLogin = document.getElementById("form-header-login");
let btnHeaderRegister = document.getElementById("form-header-register");
let btnHeaderGuest = document.getElementById("form-header-guest");

btnHeaderLogin.addEventListener('click', event => {
    formHeaderClick("login");
});

btnHeaderRegister.addEventListener('click', event => {
    formHeaderClick("register");
});

btnHeaderGuest.addEventListener('click', event => {
    formHeaderClick("guest");
});

function formHeaderClick(formName) {
    btnHeaderLogin.classList.remove("active");
    btnHeaderRegister.classList.remove("active");
    btnHeaderGuest.classList.remove("active");

    document.getElementById("form-login").classList.remove("active");
    document.getElementById("form-register").classList.remove("active");
    document.getElementById("form-guest").classList.remove("active");

    document.getElementById("form-header-" + formName).classList.add("active");
    document.getElementById("form-" + formName).classList.add("active");

    document.getElementById("alertBox").style.display = "none";
}

/* FORM Validation FUNCTIONS */

function submitLogin() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPw").value;

}

function submitRegister() {
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPw").value;
    let pwRepeat = document.getElementById("registerPwRepeat").value;

    let alertBox = document.getElementById("alertBox");

    let error = "";

    if (password != pwRepeat) {
        error += "<p>Die Passwörter stimmen nicht überein!</p>";
    }

    //TODO
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", false); //<- Synchron
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send("username=" + username + "&password" + password); 



    if(error.length > 0) {
        alertBox.innerHTML = error;
        alertBox.style.display = "block";
    
        console.log(alertBox.style.display);
    }

}