function isValid() {
  const username = document.getElementById("name").value;
  if (username.length < 3) {
    document.getElementById("nameError").textContent =
      "Name should be at least 3 characters";
    return false;
  }

  const email = document.getElementById("email").value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert("Email is not valid");
    return false;
  }

  const password = document.getElementById("password").value;
  if (password.length < 6) {
    alert("Password should be at least 6 characters");
    return false;
  }

  const confirmPassword = document.getElementById("confirmPassword").value;
  if (confirmPassword.length < 6) {
    alert("Confirm Password should be at least 6 characters");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Password and Confirm Password should be the same");
    return false;
  }

  return true;
}

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  if (isValid()) {
    const formData = [
      document.getElementById("name").value,
      document.getElementById("email").value,
      document.getElementById("password").value,
    ];
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("Form submitted");
  } else {
    console.log("Error: Form validation failed");
  }
});
