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

btnHeaderLogin.addEventListener('click', event => {
    formHeaderClick("login");
});

btnHeaderRegister.addEventListener('click', event => {
    formHeaderClick("register");
});

function formHeaderClick(formName) {
    btnHeaderLogin.classList.remove("active");
    btnHeaderRegister.classList.remove("active");

    document.getElementById("form-login").classList.remove("active");
    document.getElementById("form-register").classList.remove("active");

    document.getElementById("form-header-" + formName).classList.add("active");
    document.getElementById("form-" + formName).classList.add("active");
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