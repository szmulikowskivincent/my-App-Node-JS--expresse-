document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const usernameError = document.getElementById("username-error");

  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");

  function validateUsername() {
    const username = usernameInput.value;

    if (!username.includes("@")) {
      usernameError.textContent = "Le nom d'utilisateur doit contenir un '@'.";
      usernameError.style.color = "red";
      return false;
    }

    if (username.length < 5) {
      usernameError.textContent =
        "Le nom d'utilisateur doit comporter au moins 5 caractères.";
      usernameError.style.color = "red";
      return false;
    }

    if (username.length > 50) {
      usernameError.textContent =
        "Le nom d'utilisateur ne peut pas dépasser 20 caractères.";
      usernameError.style.color = "red";
      return false;
    }

    usernameError.textContent = "";
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value;

    if (password.length < 8) {
      passwordError.textContent =
        "Le mot de passe doit comporter au moins 8 caractères.";
      passwordError.style.color = "red";
      return false;
    }

    if (password.length > 20) {
      passwordError.textContent =
        "Le mot de passe ne peut pas dépasser 20 caractères.";
      passwordError.style.color = "red";
      return false;
    }

    if (!password) {
      passwordError.textContent = "Le mot de passe est obligatoire.";
      passwordError.style.color = "red";
      return false;
    }

    passwordError.textContent = "";
    return true;
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();

    if (!isUsernameValid || !isPasswordValid) {
      event.preventDefault();
    }
  });

  usernameInput.addEventListener("input", function () {
    if (usernameInput.value) {
      validateUsername();
    }
  });

  passwordInput.addEventListener("input", function () {
    if (passwordInput.value) {
      validatePassword();
    }
  });
});
