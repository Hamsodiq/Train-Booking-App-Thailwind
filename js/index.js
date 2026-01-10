window.onload = function () {

  // == TOAST FUNCTION ==//
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
    }, 4000);
  }

  // ================================
  // PASSWORD TOGGLE
  // ================================
  function setupToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";

      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
      icon.classList.toggle("text-green-600");
    });
  }

  setupToggle("password", "togglePwd");
  setupToggle("confirmPassword", "toggleConfirmPwd");

  // ================================
  // CHECKBOX + BUTTON ENABLE/DISABLE
  // ================================
  const checkbox = document.querySelector("input[type='checkbox']");
  const signBtn = document.querySelector("button");

  signBtn.disabled = !checkbox.checked;
  signBtn.classList.toggle("opacity-50", !checkbox.checked);
  signBtn.classList.toggle("cursor-not-allowed", !checkbox.checked);

  checkbox.addEventListener("change", () => {
    signBtn.disabled = !checkbox.checked;
    signBtn.classList.toggle("opacity-50", !checkbox.checked);
    signBtn.classList.toggle("cursor-not-allowed", !checkbox.checked);
  });

  // ================================
  // FORM SUBMIT
  // ================================
  document
    .getElementById("signupForm")
    .addEventListener("submit", validate);

  // ================================
  // VALIDATION FUNCTION
  // ================================
  function validate(e) {
    e.preventDefault();

    const firstName = document.getElementById("fname").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const outputMessage = document.getElementById("outputMessage");

    outputMessage.textContent = "";

    const userEmailCheck = getRegisteredUser().find(
      (user) => user.email === email
    );

    if (userEmailCheck) {
      outputMessage.style.color = "red";
      outputMessage.textContent = "Email already registered";
      return;
    }

    if (password !== confirmPassword) {
      outputMessage.style.color = "red";
      outputMessage.textContent = "⚠ Passwords do not match.";
      return;
    }

    if (password.length < 8) {
      outputMessage.style.color = "red";
      outputMessage.textContent = "⚠ Password must be at least 8 characters.";
      return;
    }

    // ✅ SUCCESS
    const registeredUser = new User(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    saveRegisteredUser(registeredUser);

    outputMessage.style.color = "green";
    outputMessage.textContent = "Registration successful";

    showIgToast("Account created successfully!");

    document.getElementById("signupForm").reset();

    setTimeout(() => {
      window.location.href = "/html/login.html";
    }, 2000);
  }
};
