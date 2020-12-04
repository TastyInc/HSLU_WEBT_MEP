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
    document.getElementById("form-header-login").classList.remove("active");
    document.getElementById("form-header-register").classList.remove("active");
    document.getElementById("form-header-guest").classList.remove("active");

    document.getElementById("form-login").classList.remove("active");
    document.getElementById("form-register").classList.remove("active");
    document.getElementById("form-guest").classList.remove("active");

    document.getElementById("form-header-" + formName).classList.add("active");
    document.getElementById("form-" + formName).classList.add("active");

}