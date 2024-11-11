const signup = document.getElementById("signup");
const signin = document.getElementById("signin");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const loginemail = document.getElementById("loginemail");
const loginpassword = document.getElementById("loginpassword");
let isValid = false;

signup.addEventListener("click", (event) => {
  event.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
  signup.classList.add("active");
  signin.classList.remove("active");
  document.getElementById("title").textContent = "Register with Us";
});

signin.addEventListener("click", (event) => {
  event.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "flex";
  signin.classList.add("active");
  signup.classList.remove("active");
  document.getElementById("title").textContent = "Login";
});

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

function validateUsername() {
  const username = document.getElementById("name");
  const errorDiv = document.getElementById("nameError");
  if (username.value.length === 0) {
    errorDiv.textContent = "Name is required";
    return false;
  } else if (username.value.length < 3) {
    errorDiv.textContent = "Name should be at least 3 characters";
    return false;
  } else if (localStorage.getItem("formData")) {
    let data = JSON.parse(localStorage.getItem("formData"));
    if (data.some((item) => item.name === username.value)) {
      errorDiv.textContent = "Name already exists";
      return false;
    }
  }
  errorDiv.textContent = "";
  return true;
}

function validateEmail() {
  const email = document.getElementById("email");
  const errorDiv = document.getElementById("emailError");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    errorDiv.textContent = "Email is not valid";
    return false;
  }
  if (localStorage.getItem("formData")) {
    let data = JSON.parse(localStorage.getItem("formData"));
    if (data.some((item) => item.email === email.value)) {
      errorDiv.textContent = "Email already registered";
      return false;
    }
  }
  errorDiv.textContent = "";
  return true;
}

function validatePassword() {
  const password = document.getElementById("password");
  const errorDiv = document.getElementById("passwordError");
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  if (!passwordPattern.test(password.value)) {
    errorDiv.textContent =
      "Password should be at least 8 characters with one capital letter and one special character";
    return false;
  }
  errorDiv.textContent = "";
  return true;
}

function validateConfirmPassword() {
  const confirmpassword = document.getElementById("confirmpassword");
  const password = document.getElementById("password");
  console.log(password.value, confirmpassword.value);
  const errorDiv = document.getElementById("confirmpasswordError");
  if (password.value != confirmpassword.value) {
    errorDiv.textContent = "Password and Confirm Password should be the same";
    return false;
  }
  errorDiv.textContent = "";
  return true;
}

function addFieldToForm(field) {
  const fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add("fieldWrapper");
  const label = document.createElement("label");
  label.textContent = `${field.labelValue}:`;
  fieldWrapper.appendChild(label);

  let input;
  if (field.type === "select") {
    input = document.createElement("select");
    field.options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      input.appendChild(opt);
    });
  } else if (field.type === "radio") {
    input = document.createElement("div");
    field.options.forEach((option) => {
      const radioWrapper = document.createElement("div");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = field.labelValue;
      radio.value = option;
      const radioLabel = document.createElement("label");
      radioLabel.textContent = option;
      radioWrapper.appendChild(radio);
      radioWrapper.appendChild(radioLabel);
      input.appendChild(radioWrapper);
    });
  } else {
    input = document.createElement("input");
    input.type = field.type;
    input.id = field.labelValue.toLowerCase().replace(" ", "");
  }

  fieldWrapper.appendChild(input);
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  errorDiv.id = `${field.labelValue.toLowerCase().replace(" ", "")}Error`;
  fieldWrapper.appendChild(errorDiv);

  registerForm.appendChild(fieldWrapper);
}

function renderFields() {
  registerForm.innerHTML = "";
  const savedFields = JSON.parse(localStorage.getItem("formFields")) || [];

  savedFields.forEach((field) => {
    addFieldToForm(field);
  });

  document.getElementById("name")?.addEventListener("blur", validateUsername);
  document.getElementById("email")?.addEventListener("blur", validateEmail);
  document
    .getElementById("password")
    ?.addEventListener("blur", validatePassword);
  document
    .getElementById("confirmpassword")
    ?.addEventListener("blur", validateConfirmPassword);

  const registerBtn = document.createElement("button");
  registerBtn.id = "registerBtn";
  registerBtn.textContent = "Register";
  registerForm.appendChild(registerBtn);

  registerBtn.addEventListener("click", () => {
    const isFormValid =
      validateUsername() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword();

    if (isFormValid) {
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      let data = JSON.parse(localStorage.getItem("formData")) || [];
      data.push(formData);
      localStorage.setItem("formData", JSON.stringify(data));
      alert("Registered successfully");
      document.getElementById("register").reset();
    } else {
      alert("Please fill the valid data");
    }
  });
}

window.addEventListener("load", renderFields);
