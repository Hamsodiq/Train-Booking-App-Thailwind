window.onload = function () {

    const boxes = Array.from(document.querySelectorAll(".code-box"));
    const resend = document.getElementById("resend");
    const form = document.getElementById("code-form");

    // Focus the first input on page load
    boxes[0].focus();

    // Handle typing in each box
    boxes.forEach((box, index) => {

        // When user types
        box.addEventListener("input", function () {
            let val = box.value.replace(/\D/g, ""); // keep digits only

            if (val.length === 1) {
                box.value = val;

                // Move to next input automatically
                if (index < boxes.length - 1) {
                    boxes[index + 1].focus();
                }
            }

            // Handle paste of full OTP or multiple digits
            if (val.length > 1) {
                const digits = val.split("").slice(0, boxes.length);

                digits.forEach((d, i) => {
                    boxes[i].value = d;
                });

                // Focus last filled box
                const last = Math.min(digits.length - 1, boxes.length - 1);
                boxes[last].focus();
            }
        });

        // Handle Backspace
        box.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && !box.value && index > 0) {
                boxes[index - 1].value = "";
                boxes[index - 1].focus();
            }
        });

    });

    // Handle form submit (GET FULL CODE HERE)
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Join all 6 digits
        const code = boxes.map(box => box.value).join("");

        console.log("Entered Code:", code);
        const correctCode = "123456";

        const inputCodeOutput = document.getElementById('inputCodeOutput');

        //Check if code is entered

        if (code.length > 6 || code != correctCode) {
            inputCodeOutput.innerHTML = 'code incorrect and verification code must be six characters';
            inputCodeOutput.style.color = 'red';
            // document.getElementById("codeInput").style.border = '2px solid red';
            return;
        }   if (code === correctCode) {
            inputCodeOutput.innerHTML = 'Email sucessfully verified';
            inputCodeOutput.style.color = 'green';
            window.location.href = "../html/resetpassword.html";
            // document.getElementById("codeInput").style.border = '1px solid #A2A6B0';
            // document.getElementById("passwordPage").hidden = false;

        }


        // if (code.length !== 6) {
        //     alert("Please enter all 6 digits.");
        //     return;
        // }

        // alert("Verification Code: " + code);

        // // TODO: send to API if needed
    });

    // Resend link
    resend.addEventListener("click", function (e) {
        e.preventDefault();
        boxes.forEach(box => box.value = "");
        boxes[0].focus();
        alert("A new verification code has been sent.");
    });

};
