const toastContainer = document.getElementById("toast-container");

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  usernameError.innerText = "";
  passwordError.innerText = "";
  usernameInput.classList.remove("invalid", "valid");
  passwordInput.classList.remove("invalid", "valid");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  if (username === "") {
    usernameError.innerText = "Le nom d'utilisateur est requis.";
    usernameInput.classList.add("invalid");
    isValid = false;
  } else {
    usernameInput.classList.add("valid");
  }

  if (password === "") {
    passwordError.innerText = "Le mot de passe est requis.";
    passwordInput.classList.add("invalid");
    isValid = false;
  }

  if (isValid) {
    const storedUsername = localStorage.getItem("username");

    if (username === storedUsername) {
      showToast("Connexion réussie !", true, () => {
        window.location.href = "/dashboard";
      });
    } else {
      showToast("Nom d'utilisateur incorrect.", false);
    }
  } else {
    showToast("Échec de la connexion : veuillez corriger les erreurs.", false);
  }
});

function showToast(message, isSuccess, callback) {
  if (!toastContainer) {
    console.error("Toast container is not available in the DOM.");
    return;
  }

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
