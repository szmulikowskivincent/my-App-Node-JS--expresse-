document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const usernameError = document.getElementById("username-error");

  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");

  const toastContainer = document.getElementById("toast-container");

  function showToast(message, color) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.marginBottom = "10px";
    toast.style.color = "white";
    toast.style.backgroundColor = color;
    toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.5s ease";

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }

  async function fetchUsers() {
    try {
      const response = await fetch("/db.json");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des utilisateurs");
      const data = await response.json();
      return data.users || [];
    } catch (error) {
      console.error(error.message);
      showToast("Erreur : Impossible de charger les utilisateurs.", "red");
      return [];
    }
  }

  async function doesUserExist(username) {
    const users = await fetchUsers();
    return users.some((user) => user.username === username);
  }

  async function validateUsername() {
    const username = usernameInput.value;
    let valid = true;

    usernameError.textContent = "";

    if (!username.includes("@")) {
      usernameError.textContent = "Le nom d'utilisateur doit contenir un '@'.";
      usernameError.style.color = "red";
      valid = false;
    } else if (username.length < 5) {
      usernameError.textContent =
        "Le nom d'utilisateur doit comporter au moins 5 caractères.";
      usernameError.style.color = "red";
      valid = false;
    } else if (username.length > 50) {
      usernameError.textContent =
        "Le nom d'utilisateur ne peut pas dépasser 50 caractères.";
      usernameError.style.color = "red";
      valid = false;
    } else {
      const userExists = await doesUserExist(username);
      if (userExists) {
        usernameError.textContent =
          "Cet utilisateur existe déjà. Veuillez en choisir un autre.";
        usernameError.style.color = "orange";
        valid = false;
      }
    }

    return valid;
  }

  function validatePassword() {
    const password = passwordInput.value;
    let valid = true;

    passwordError.textContent = "";

    if (password.length < 8) {
      passwordError.textContent =
        "Le mot de passe doit comporter au moins 8 caractères.";
      passwordError.style.color = "red";
      valid = false;
    } else if (password.length > 20) {
      passwordError.textContent =
        "Le mot de passe ne peut pas dépasser 20 caractères.";
      passwordError.style.color = "red";
      valid = false;
    }

    return valid;
  }

  document
    .querySelector("#register-button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const isUsernameValid = await validateUsername();
      const isPasswordValid = validatePassword();

      if (!isUsernameValid || !isPasswordValid) {
        showToast(
          "Échec de l'enregistrement : vérifiez vos informations.",
          "red"
        );
        return;
      }

      const userExists = await doesUserExist(usernameInput.value);
      if (userExists) {
        showToast(
          "Cet utilisateur existe déjà. Veuillez en choisir un autre.",
          "orange"
        );
      } else {
        showToast("Enregistrement réussi !", "green");
      }
    });
});
