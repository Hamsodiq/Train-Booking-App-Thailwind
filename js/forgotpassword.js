window.onload = function () {

  document.getElementById("reset-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const user = getRegisteredUser().find((user) => user.email == email);
    const outputMessage = document.getElementById('outputMessage');

    if (!user) {
      outputMessage.innerHTML = 'Email Not Valid';
      outputMessage.style.color = 'red';
      outputMessage.style.border = '2px red';
      return;
    } else {
      outputMessage.innerHTML = 'Email is Valid';
      outputMessage.style.color = 'green';
      outputMessage.style.border = '1px #A2A6B0';

      sessionStorage.setItem('lastUserForgotPasswordEmail', email);
      window.location.href = "../html/mailverification.html";
    }
  });
};
