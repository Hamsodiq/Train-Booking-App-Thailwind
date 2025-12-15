window.onload = function () {

  // ================================
  // PASSWORD VISIBILITY TOGGLE
  // ================================
  function setupToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!input || !icon) return;

    icon.addEventListener("click", function () {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }

  setupToggle("password", "togglePassword");
  setupToggle("confirmPassword", "toggleConfirmPassword");

  // ================================
  // FORM SUBMIT
  // ================================
  document
    .getElementById("resetForm")
    .addEventListener("submit", newPasswordValidate);
};

// ================================
// PASSWORD RESET LOGIC
// ================================
function newPasswordValidate(e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const output = document.getElementById("output");
  const confirmInput = document.getElementById("confirmPassword");

  confirmInput.style.border = "1px solid #d1d5db";

  if (password !== confirmPassword) {
    output.textContent = "Passwords do not match";
    output.style.color = "red";
    confirmInput.style.border = "2px solid red";
    return;
  }

  output.textContent = "Password successfully changed";
  output.style.color = "green";

  const lastUserMail = sessionStorage.getItem("lastUserForgotPasswordEmail");
  if (!lastUserMail) return;

  const users = getRegisteredUser();
  const index = users.findIndex(user => user.email === lastUserMail);

  if (index === -1) return;

  users[index].password = password;
  localStorage.setItem("registeredUser", JSON.stringify(users));

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 1200);
}
