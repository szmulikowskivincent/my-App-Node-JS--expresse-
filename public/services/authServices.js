const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

document.querySelectorAll("a[data-protected]").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const protectedRoute = this.getAttribute("data-protected") === "true";
    const targetLink = this.getAttribute("data-link");

    if (protectedRoute && !isLoggedIn) {
      window.location.href = "register.html";
    } else {
      window.location.href = targetLink;
    }
  });
});
