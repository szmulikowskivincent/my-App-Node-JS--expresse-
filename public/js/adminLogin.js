document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (username === "admin" && password === "admin123") {
      window.location.href = "/admin.html";
    } else {
      alert("Invalid credentials!");
    }
  });
