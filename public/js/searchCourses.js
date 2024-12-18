document.addEventListener("DOMContentLoaded", function () {
  const coursesList = document.getElementById("coursesList");
  const searchBar = document.getElementById("searchBar");
  const searchButton = document.getElementById("searchButton");
  let allCourses = [];

  function displayCourses(courses) {
    coursesList.innerHTML = "";
    courses.forEach((course) => {
      const newCourse = document.createElement("div");
      newCourse.classList.add("col");
      newCourse.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-play-circle"></i> ${course.title}
              </h5>
              <p class="card-text">${course.description}</p>
              <a href="${course.link}" target="_blank" class="btn btn-primary w-50 mb-2">
                <i class="fas fa-link"></i> Access Course
              </a>
            </div>
          </div>
        `;
      coursesList.appendChild(newCourse);
    });
  }

  async function loadCourses() {
    try {
      const response = await fetch("/courses");
      const data = await response.json();
      allCourses = data;
      displayCourses(data);
    } catch (error) {
      console.error("Erreur lors du chargement des formations", error);
    }
  }

  function filterCourses() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredCourses = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm)
    );
    displayCourses(filteredCourses);
  }

  searchBar.addEventListener("input", filterCourses);
  searchButton.addEventListener("click", filterCourses);

  loadCourses();
});
