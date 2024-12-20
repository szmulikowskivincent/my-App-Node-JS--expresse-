document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  const toastContainer = document.getElementById("toast-container");

  usernameError.innerText = "";
  passwordError.innerText = "";

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  if (username === "") {
    usernameError.innerText = "Le nom d'utilisateur est requis.";
    isValid = false;
  }

  if (password === "") {
    passwordError.innerText = "Le mot de passe est requis.";
    isValid = false;
  } else if (password.length < 6) {
    passwordError.innerText =
      "Le mot de passe doit comporter au moins 6 caractères.";
    isValid = false;
  }

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

  if (isValid) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", "**********");

    showToast("Connexion réussie !", true, () => {
      window.location.href = "/dashboard";
    });
  } else {
    showToast("Échec de la connexion : veuillez corriger les erreurs.", false);
  }
});
