document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  // Désactiver la validation HTML5 native pour gérer les messages nous-mêmes
  usernameInput.removeAttribute("required");
  passwordInput.removeAttribute("required");

  form.addEventListener("submit", function (event) {
    let valid = true;

    // Réinitialiser les messages d'erreur et les styles
    usernameError.textContent = "";
    passwordError.textContent = "";
    usernameInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    // Valider le username
    const username = usernameInput.value;
    if (!username.includes("@")) {
      usernameError.textContent = 'Le nom d\'utilisateur doit contenir un "@"';
      usernameInput.style.borderColor = "red"; // Bordure rouge pour erreur
      valid = false;
    } else {
      usernameInput.style.borderColor = "green"; // Bordure verte pour validité
    }

    // Valider le mot de passe
    const password = passwordInput.value;
    if (password.length < 5) {
      passwordError.textContent =
        "Le mot de passe doit contenir au moins 5 caractères";
      passwordInput.style.borderColor = "red"; // Bordure rouge pour erreur
      valid = false;
    } else if (password.length > 15) {
      passwordError.textContent =
        "Le mot de passe ne doit pas dépasser 15 caractères";
      passwordInput.style.borderColor = "red"; // Bordure rouge pour erreur
      valid = false;
    } else {
      passwordInput.style.borderColor = "green"; // Bordure verte pour validité
    }

    // Si le formulaire est invalide, empêcher sa soumission
    if (!valid) {
      event.preventDefault();
    }
  });
});
