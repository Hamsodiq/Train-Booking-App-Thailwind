window.onload = function () {

  // =================
  // TOAST FUNCTION
  // =================
  function showIgToast(message) {
    const toast = document.getElementById("igToast");
    const messageEl = document.getElementById("igToastMessage");

    messageEl.textContent = message;

    toast.classList.remove(
      "-translate-y-[150%]",
      "opacity-0",
      "pointer-events-none"
    );

    setTimeout(() => {
      toast.classList.add(
        "-translate-y-[150%]",
        "opacity-0",
        "pointer-events-none"
      );
    }, 5000);
  }

  // =========================
  // PASSWORD TOGGLE
  // =========================
  const passwordField = document.getElementById("password");
  const togglePwd = document.getElementById("togglePwd");

  togglePwd.addEventListener("click", () => {
    const isPassword = passwordField.type === "password";
    passwordField.type = isPassword ? "text" : "password";

    togglePwd.classList.toggle("fa-eye");
    togglePwd.classList.toggle("fa-eye-slash");
  });

  // =========================
  // FORM SUBMIT
  // =========================
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      validate(showIgToast);
    });
};


// =========================
// VALIDATION FUNCTION
// =========================
function validate(showIgToast) {

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const outputMessage = document.getElementById("outputMessage");

  const userLogin = getRegisteredUser().find(
    (user) => user.email === email
  );

  if (!userLogin) {
    outputMessage.textContent = "Email address does not match.";
    outputMessage.style.color = "red";
    return;
  }

  if (userLogin.password !== password) {
    outputMessage.textContent = "Password does not match.";
    outputMessage.style.color = "red";
    return;
  }

  // ✅ SUCCESS
  saveLoggedInUser(userLogin);
  outputMessage.textContent = "";
  showIgToast("Login successful!");

  setTimeout(() => {
    window.location.href = "../html/dashboard.html";
  }, 1200);
}
