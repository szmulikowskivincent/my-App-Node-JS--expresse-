document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  usernameInput.removeAttribute("required");
  passwordInput.removeAttribute("required");

  form.addEventListener("submit", function (event) {
    let valid = true;

    usernameError.textContent = "";
    passwordError.textContent = "";
    usernameInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    const username = usernameInput.value;
    if (!username.includes("@")) {
      usernameError.textContent =
        '* Le nom d\'utilisateur doit contenir un "@"';
      usernameInput.style.borderColor = "red";
      valid = false;
    } else {
      usernameInput.style.borderColor = "green";
    }

    const password = passwordInput.value;
    if (password.length < 5) {
      passwordError.textContent =
        "* Le mot de passe doit contenir au moins 5 caractères";
      passwordInput.style.borderColor = "red";
      valid = false;
    } else if (password.length > 15) {
      passwordError.textContent =
        "* Le mot de passe ne doit pas dépasser 15 caractères";
      passwordInput.style.borderColor = "red";
      valid = false;
    } else {
      passwordInput.style.borderColor = "green";
    }

    if (valid) {
      const maskedPassword = "*".repeat(password.length);
      localStorage.setItem("username", username);
      localStorage.setItem("password", maskedPassword);
    }

    if (!valid) {
      event.preventDefault();
    }
  });
});

function handleLogin(event) {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  usernameError.textContent = "";
  passwordError.textContent = "";

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username !== storedUsername) {
    usernameError.textContent = "Nom d'utilisateur incorrect";
    usernameInput.style.borderColor = "red";
    event.preventDefault();
  } else {
    usernameInput.style.borderColor = "green";
  }

  if (password !== storedPassword) {
    passwordError.textContent = "Mot de passe incorrect";
    passwordInput.style.borderColor = "red";
    event.preventDefault();
  } else {
    passwordInput.style.borderColor = "green";
  }
}

document.getElementById("login-form").addEventListener("submit", handleLogin);

document.addEventListener("DOMContentLoaded", function () {
  const passwordField = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", function () {
    const currentType = passwordField.type;
    passwordField.type = currentType === "password" ? "text" : "password";

    const icon = togglePassword.querySelector("i");
    if (passwordField.type === "password") {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
});
