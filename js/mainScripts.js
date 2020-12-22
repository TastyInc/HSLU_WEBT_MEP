
let nav = document.querySelector("nav");

if(window.scrollY >= window.innerHeight - 60){
    nav.style.backgroundColor = "#233434";
} else {
    nav.style.backgroundColor = "transparent"; 
}

/* EVENTS */
window.addEventListener("scroll", function(){

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
}

function showErrorBox(errorText){
    let alertBox = document.getElementById("alertBox");

    alertBox.innerHTML = "<p>" + errorText + "</p>";
    alertBox.style.display = "block";
    alertBox.className = "errorBox";
}

function showSuccessBox(successText){
    let alertBox = document.getElementById("alertBox");

    alertBox.innerHTML = "<p>" + successText + "</p>";
    alertBox.style.display = "block";
    alertBox.className = "successBox";
}

/* FORM Validation */

function checkPwMatch() {
    let pw = document.getElementById('registerPw');
    let pwRepeat = document.getElementById('registerPwRepeat');

    if(pw.value == pwRepeat.value) {
        pwRepeat.style.background = "#cfc"
        document.getElementById("registerBtnSubmit").disabled = false;
    } else {
        pwRepeat.style.background = "#faa"
        document.getElementById("registerBtnSubmit").disabled = true;
    }
}