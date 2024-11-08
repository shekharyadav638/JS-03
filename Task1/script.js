let username = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
const signup = document.getElementById("signup");
const signin = document.getElementById("signin");
const register = document.getElementById("register");
const login = document.getElementById("login");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
let isValid = false;

signup.addEventListener("click", (event) => {
  event.preventDefault();
  login.style.display = "none";
  register.style.display = "flex";
  signup.classList.add("active");
  signin.classList.remove("active");
  document.getElementById("title").textContent = "Register with Us";
});

signin.addEventListener("click", (event) => {
  event.preventDefault();
  register.style.display = "none";
  login.style.display = "flex";
  signin.classList.add("active");
  signup.classList.remove("active");
  document.getElementById("title").textContent = "Login";
});

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

registerBtn.addEventListener("click", () => {
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
    document.getElementById("register").reset();
  } else {
    alert("Please fill the valid data");
  }
});

const loginemail = document.getElementById("loginemail");
const loginpassword = document.getElementById("loginpassword");

loginBtn.addEventListener("click", () => {
  const formData = JSON.parse(localStorage.getItem("formData")) || [];
  const user = formData.find(
    (item) =>
      item.email === loginemail.value && item.password === loginpassword.value
  );
  if (user) {
    window.location.href = "admin.html";
    login.reset();
  } else {
    alert("Invalid credentials");
  }
});
