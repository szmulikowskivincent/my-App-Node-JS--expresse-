document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  const toastContainer = document.getElementById("toast-container");

  // Réinitialiser les messages d'erreur et les classes de validation
  usernameError.innerText = "";
  passwordError.innerText = "";
  usernameInput.classList.remove("invalid", "valid");
  passwordInput.classList.remove("invalid", "valid");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  // Validation du nom d'utilisateur
  if (username === "") {
    usernameError.innerText = "Le nom d'utilisateur est requis.";
    usernameInput.classList.add("invalid");
    isValid = false;
  } else {
    usernameInput.classList.add("valid");
  }

  // Validation du mot de passe
  if (password === "") {
    passwordError.innerText = "Le mot de passe est requis.";
    passwordInput.classList.add("invalid");
    isValid = false;
  } else if (password.length < 6) {
    passwordError.innerText =
      "Le mot de passe doit comporter au moins 6 caractères.";
    passwordInput.classList.add("invalid");
    isValid = false;
  } else if (password.length > 15) {
    passwordError.innerText =
      "Le mot de passe ne doit pas dépasser 15 caractères.";
    passwordInput.classList.add("invalid");
    isValid = false;
  } else {
    passwordInput.classList.add("valid");
  }

  // Fonction pour afficher un toast
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

  // Si le formulaire est valide
  if (isValid) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", "**********");

    showToast("Connexion réussie !", true, () => {
      window.location.href = "/dashboard"; // Redirection vers le dashboard
    });
  } else {
    showToast("Échec de la connexion : veuillez corriger les erreurs.", false);
  }
});
