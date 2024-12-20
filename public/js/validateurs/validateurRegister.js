document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const togglePassword = document.getElementById("togglePassword");

  form.addEventListener("submit", function (event) {
    let valid = true;

    usernameError.textContent = "";
    passwordError.textContent = "";
    usernameInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username.includes("@")) {
      usernameError.textContent =
        '* Le nom d\'utilisateur doit contenir un "@"';
      usernameInput.style.borderColor = "red";
      valid = false;
    } else {
      usernameInput.style.borderColor = "green";
    }

    if (password.length < 5 || password.length > 15) {
      passwordError.textContent =
        "* Le mot de passe doit contenir entre 5 et 15 caractères";
      passwordInput.style.borderColor = "red";
      valid = false;
    } else {
      passwordInput.style.borderColor = "green";
    }

    if (valid) {
      const maskedPassword = maskPassword(password);
      localStorage.setItem("username", username);
      localStorage.setItem("password", maskedPassword);
    } else {
      event.preventDefault();
    }
  });

  function maskPassword(password) {
    const symbols = ["*", "/", "@", "#", "$", "%", "&", "!"];
    let masked = "";

    for (let i = 0; i < password.length; i++) {
      masked += symbols[i % symbols.length];
    }

    return masked;
  }

  togglePassword.addEventListener("click", function () {
    const currentType = passwordInput.type;
    passwordInput.type = currentType === "password" ? "text" : "password";

    const icon = togglePassword.querySelector("i");
    if (passwordInput.type === "password") {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
});
