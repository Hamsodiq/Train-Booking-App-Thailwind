window.onload = function () {

  // ================================
  // PASSWORD TOGGLE FUNCTION
  // ================================
  function setupToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";

      // Switch between eye and eye-slash
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");

      // Optional: make icon green when active
      icon.classList.toggle("text-green-600");
    });
  }

  // Apply to both password fields
  setupToggle("password", "togglePwd");
  setupToggle("confirmPassword", "toggleConfirmPwd");

  // ================================
  // CHECKBOX + BUTTON ENABLE/DISABLE
  // ================================
  const checkbox = document.querySelector("input[type='checkbox']");
  const signBtn = document.querySelector("button");

  // Set initial state
  if (!checkbox.checked) {
    signBtn.disabled = true;
    signBtn.classList.add("opacity-50", "cursor-not-allowed");
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // ENABLE BUTTON
      signBtn.disabled = false;
      signBtn.classList.remove("opacity-50", "cursor-not-allowed");

      // Checkbox tailwind green style
      checkbox.classList.add("text-green-600", "accent-green-600");

    } else {
      // DISABLE BUTTON
      signBtn.disabled = true;
      signBtn.classList.add("opacity-50", "cursor-not-allowed");

      // Remove green color
      checkbox.classList.remove("accent-green-600");
    }
  });

  document.getElementById("signupForm").addEventListener("submit", validate);
};


function validate(e) {
    e.preventDefault();

    const firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let outputMessage = document.getElementById("outputMessage");
    

    const userEmailCheck = getRegisteredUser().find((user) => user.email === email);
    // const citizenMobileCheck = getCitizenUser().find((citizen) => citizen.mobile === mobile);
    if(userEmailCheck){
        outputMessage.style.color = "red";
        outputMessage.textContent = "Email already Registered";
        return;
    }  
    
    if (password !== confirmPassword) {
        outputMessage.style.color = "red";
        outputMessage.textContent = "⚠ Passwords do not match.";
        return;
    }  if (password.length < 8) {
        outputMessage.style.color = "red";
        outputMessage.textContent = "⚠ Password must be at least 8 characters.";
        return;
    } else{
        outputMessage.style.color = "green";
        outputMessage.textContent = "Registration Sucessful";
    }
    
    let registeredUser = new User(firstName, lastName, email, password, confirmPassword);
    console.log(registeredUser);
    saveRegisteredUser(registeredUser);
    document.getElementById("signupForm").reset();
    window.location.href = "../html/login.html";
}
