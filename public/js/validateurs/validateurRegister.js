document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const usernameError = document.getElementById("username-error");

  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");

  const toastContainer = document.getElementById("toast-container");

  function showToast(message, isSuccess, callback) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.marginBottom = "10px";
    toast.style.color = "white";
    toast.style.backgroundColor = isSuccess ? "green" : "red";
    toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.5s ease";

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.remove();
        if (callback) callback();
      }, 500);
    }, 3000);
  }

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
      showToast(
        "Échec de l'enregistrement : veuillez corriger les erreurs.",
        false
      );
    } else {
      event.preventDefault();

      showToast("Enregistrement réussi !", true, () => {
        window.location.href = "/login";
      });
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
