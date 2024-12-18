const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (!username || !password) {
  window.location.href = "/login";
} else {
  document.getElementById("username").textContent = username;

  const initials = username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  const avatarElement = document.getElementById("userAvatar");
  if (avatarElement) {
    avatarElement.textContent = initials;
  }
}

document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  window.location.href = "/login";
});
