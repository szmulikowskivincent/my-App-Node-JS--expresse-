const savedPassword = localStorage.getItem("password");
if (savedPassword) {
  document.getElementById("password").value = savedPassword;
}
