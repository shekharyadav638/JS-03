let username = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
const btn = document.getElementById("btn");
let isValid = false;

function validateUsername() {
  if (username.value.length == 0) {
    document.getElementById("nameError").textContent = "Name is required";
    return false;
  } else if (username.value.length < 3) {
    document.getElementById("nameError").textContent =
      "Name should be at least 3 characters";
    return false;
  } else if (localStorage.getItem("formData")) {
    let data = JSON.parse(localStorage.getItem("formData"));
    if (data.some((item) => item.name === username.value)) {
      document.getElementById("nameError").textContent = "Name already exists";
      return false;
    }
  }
  document.getElementById("nameError").textContent = "";
  return true;
}

function validateEmail() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    document.getElementById("emailError").textContent = "Email is not valid";
    return false;
  }
  if (localStorage.getItem("formData")) {
    let data = JSON.parse(localStorage.getItem("formData"));
    if (data.some((item) => item.email === email.value)) {
      document.getElementById("emailError").textContent =
        "Email already registered";
      return false;
    }
  }
  document.getElementById("emailError").textContent = "";
  return true;
}

function validatePassword() {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  if (!passwordPattern.test(password.value)) {
    document.getElementById("passwordError").textContent =
      "Password should be at least 8 characters with one capital letter and one special character";
    return false;
  }
  document.getElementById("passwordError").textContent = "";
  return true;
}

function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    document.getElementById("confirmPasswordError").textContent =
      "Password and Confirm Password should be the same";
    return false;
  }
  document.getElementById("confirmPasswordError").textContent = "";
  return true;
}

username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

btn.addEventListener("click", () => {
  const isFormValid =
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  if (isFormValid) {
    const formData = {
      name: username.value,
      email: email.value,
      password: password.value,
    };

    let data = JSON.parse(localStorage.getItem("formData")) || [];
    data.push(formData);
    localStorage.setItem("formData", JSON.stringify(data));

    console.log(localStorage.getItem("formData"));
    document.getElementById("form").reset();
  } else {
    alert("Please fill the valid data");
  }
});
