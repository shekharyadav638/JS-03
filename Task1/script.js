let username = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
const btn = document.getElementById("btn");
let isValid = false;

username.addEventListener("keypress", () => {
  if (username.value.length < 3) {
    document.getElementById("nameError").textContent =
      "Name should be at least 3 characters";
    isValid = false;
  } else {
    document.getElementById("nameError").textContent = "";
    isValid = true;
  }
});

username.addEventListener("blur", () => {
  if (localStorage.getItem("formData")) {
    let data = JSON.parse(localStorage.getItem("formData"));
    data.map((item) => {
      if (item.name === username.value) {
        document.getElementById("nameError").textContent =
          "Name already exists";
        isValid = false;
      }
    });
  }
});

email.addEventListener("keypress", () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    document.getElementById("emailError").textContent = "Email is not valid";
    isValid = false;
  } else {
    document.getElementById("emailError").textContent = "";
    isValid = true;
  }
});

email.addEventListener("blur", () => {
  if (localStorage.getItem("formData")) {
    let data = JSON.parse(localStorage.getItem("formData"));
    data.map((item) => {
      if (item.email === email.value) {
        document.getElementById("emailError").textContent =
          "Email already registered";
        isValid = false;
      }
    });
  }
});

password.addEventListener("keypress", () => {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  if (!passwordPattern.test(password.value)) {
    document.getElementById("passwordError").textContent =
      "Password should be at least 8 characters with one capital letter and one special character";
    isValid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
    isValid = true;
  }
});

confirmPassword.addEventListener("focus", () => {
  if (password.value === confirmPassword.value) {
    document.getElementById("confirmPasswordError").textContent = "";
    isValid = true;
  } else {
    document.getElementById("confirmPasswordError").textContent =
      "Password and Confirm Password should be the same";
    isValid = false;
  }
});

confirmPassword.addEventListener("blur", () => {
  if (password.value === confirmPassword.value) {
    document.getElementById("confirmPasswordError").textContent = "";
    isValid = true;
  }
});

btn.addEventListener("click", () => {
  if (isValid) {
    const formData = [
      {
        name: username.value,
        email: email.value,
        password: password.value,
      },
    ];

    if (localStorage.getItem("formData")) {
      const oldData = JSON.parse(localStorage.getItem("formData"));
      oldData.push({
        name: username.value,
        email: email.value,
        password: password.value,
      });
      localStorage.setItem("formData", JSON.stringify(oldData));
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
    console.log(localStorage.getItem("formData"));
    const formreset = document.getElementById("form");
    formreset.reset();
  } else alert("Please fill the valid data");
});
