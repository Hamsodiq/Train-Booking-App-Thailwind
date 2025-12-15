window.onload = function () {

    const passwordField = document.getElementById("password");
    const togglePwd = document.getElementById("togglePwd");

    togglePwd.addEventListener("click", () => {
        const isPassword = passwordField.type === "password";
        passwordField.type = isPassword ? "text" : "password";

        // Toggle icon
        togglePwd.classList.toggle("fa-eye");
        togglePwd.classList.toggle("fa-eye-slash");
    });

    document.getElementById("loginForm").addEventListener("submit", validate);
};

function validate(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const outputMessage = document.getElementById('outputMessage');

    const userLogin = getRegisteredUser().find(
        (user) => user.email === email
    );

    if (!userLogin) {
        outputMessage.innerHTML = 'Email addresses do not match.';
        outputMessage.style.color = 'red';
        return;
    }

    if (userLogin.password !== password) {
        outputMessage.innerHTML = 'Password does not match.';
        outputMessage.style.color = 'red';
        return;
    }

    saveLoggedInUser(userLogin);
    window.location.href = "../html/mailverification.html";
}
