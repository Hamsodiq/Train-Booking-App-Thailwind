window.onload = function () {

  // ================================
  // TOAST NOTIFICATION
  // ================================
  function showIgToast(message) {
    const toast = document.getElementById("igToast");
    const messageEl = document.getElementById("igToastMessage");

    messageEl.textContent = message;

    // SHOW
    toast.classList.remove(
      "-translate-y-full",
      "opacity-0",
      "pointer-events-none"
    );

    // HIDE AFTER 5 SECONDS
    setTimeout(() => {
      toast.classList.add(
        "-translate-y-full",
        "opacity-0",
        "pointer-events-none"
      );
    }, 5000);
  }

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
  // FORM SUBMIT HANDLER
  // ================================
  document
    .getElementById("resetForm")
    .addEventListener("submit", function (e) {
      newPasswordValidate(e);
      showIgToast("Password reset successful!");
    });
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

  // Reset border
  confirmInput.style.border = "1px solid #d1d5db";

  // Validation
  if (password !== confirmPassword) {
    output.textContent = "Passwords do not match";
    output.style.color = "red";
    confirmInput.style.border = "2px solid red";
    return;
  }

  output.textContent = "Password successfully changed";
  output.style.color = "green";

  const lastUserMail = sessionStorage.getItem(
    "lastUserForgotPasswordEmail"
  );
  if (!lastUserMail) return;

  const users = getRegisteredUser();
  const index = users.findIndex(
    user => user.email === lastUserMail
  );

  if (index === -1) return;

  users[index].password = password;
  localStorage.setItem(
    "registeredUser",
    JSON.stringify(users)
  );

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 1200);
}
