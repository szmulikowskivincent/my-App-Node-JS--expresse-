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

    if (!valid) {
      event.preventDefault();
    }
  });
});
