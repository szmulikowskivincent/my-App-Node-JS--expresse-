document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("usernameError").innerText = "";
  document.getElementById("passwordError").innerText = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  let isValid = true;

  if (username === "") {
    document.getElementById("usernameError").innerText =
      "Le nom d'utilisateur est requis.";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("passwordError").innerText =
      "Le mot de passe est requis.";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("passwordError").innerText =
      "Le mot de passe doit comporter au moins 6 caractères.";
    isValid = false;
  }

  if (isValid) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", "**********");

    alert("Connexion réussie !");

    window.location.href = "/dashboard";
  }
});
