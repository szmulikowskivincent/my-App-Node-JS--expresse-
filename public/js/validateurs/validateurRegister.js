document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  // Retirer les attributs "required" pour la validation manuelle
  usernameInput.removeAttribute("required");
  passwordInput.removeAttribute("required");

  form.addEventListener("submit", function (event) {
    let valid = true;

    // Réinitialiser les messages d'erreur et les bordures des champs
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

    // Si le formulaire est valide, enregistrer l'utilisateur dans le localStorage
    if (valid) {
      const maskedPassword = "*".repeat(password.length); // Masquer le mot de passe
      localStorage.setItem("username", username);
      localStorage.setItem("password", maskedPassword); // Sauvegarder le mot de passe masqué
    }

    // Empêcher la soumission du formulaire si invalides
    if (!valid) {
      event.preventDefault();
    }
  });
});

// Fonction pour vérifier les informations de connexion
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

  // Vérifier que l'utilisateur est enregistré et que les informations sont correctes
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

// Ajouter l'événement de connexion
document.getElementById("login-form").addEventListener("submit", handleLogin);

// Fonction pour basculer la visibilité du mot de passe
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
