document.addEventListener("DOMContentLoaded", function () {
  const courseTitle = document.getElementById("courseTitle");
  const courseDescription = document.getElementById("courseDescription");
  const courseLink = document.getElementById("courseLink");
  const submitButton = document.getElementById("submitButton");
  const addCourseForm = document.getElementById("addCourseForm");

  function checkFormValidity() {
    const isFormValid =
      courseTitle.value.trim().length >= 2 &&
      courseTitle.value.trim().length <= 20 &&
      courseDescription.value.trim().length >= 2 &&
      courseDescription.value.trim().length <= 50 &&
      courseLink.validity.valid;
    submitButton.disabled = !isFormValid;
  }

  [courseTitle, courseDescription, courseLink].forEach((field) => {
    field.addEventListener("input", checkFormValidity);
  });

  addCourseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    location.reload();
  });

  checkFormValidity();
});
