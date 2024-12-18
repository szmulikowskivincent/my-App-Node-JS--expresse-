document.addEventListener("DOMContentLoaded", function () {
  const usernameElement = document.getElementById("username");
  if (usernameElement) {
    usernameElement.textContent =
      localStorage.getItem("username") || "Szmulikowski Vincent";
  }

  const addCourseForm = document.getElementById("addCourseForm");
  const coursesList = document.getElementById("coursesList");

  const modal = document.createElement("div");
  modal.id = "infoModal";
  modal.style.position = "absolute";
  modal.style.backgroundColor = "#fff";
  modal.style.border = "1px solid #ccc";
  modal.style.padding = "15px";
  modal.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  modal.style.display = "none";
  modal.style.zIndex = "1000";
  modal.style.borderRadius = "8px";
  modal.style.maxWidth = "300px";
  document.body.appendChild(modal);

  function displayCourses(courses) {
    coursesList.innerHTML = "";
    courses.forEach((course, index) => {
      const newCourse = document.createElement("div");
      newCourse.classList.add("col");
      newCourse.innerHTML = `
        <div class="card" data-index="${index}">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fas fa-play-circle"></i> ${course.title}
            </h5>
            <p class="card-text">${course.description}</p>
            <a href="${course.link}" target="_blank" class="btn btn-primary w-50 mb-2">
              <i class="fas fa-link"></i> Access Course
            </a>
            <button class="btn btn-danger w-50 mt-2" onclick="deleteCourse(${index})">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      `;

      newCourse.addEventListener("mouseover", (event) => {
        const courseInfo = courses[index];
        modal.innerHTML = `
          <div style="text-align: start;">
            <h5>
              <i class="fas fa-book"></i> ${courseInfo.title}
            </h5>
            <p>
              <i class="fas fa-info-circle"></i> ${courseInfo.description}
            </p>
            <p>
              <a href="${courseInfo.link}" target="_blank">
                <i class="fas fa-external-link-alt"></i> Voir le cours
              </a>
            </p>
          </div>
        `;
        modal.style.display = "block";
        modal.style.left = `${event.pageX + 10}px`;
        modal.style.top = `${event.pageY + 10}px`;
      });

      newCourse.addEventListener("mouseout", () => {
        modal.style.display = "none";
      });

      coursesList.appendChild(newCourse);
    });
  }

  async function loadCourses() {
    try {
      const response = await fetch("/courses");
      const data = await response.json();
      displayCourses(data);
    } catch (error) {
      console.error("Erreur lors du chargement des formations", error);
    }
  }

  loadCourses();

  addCourseForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("courseTitle").value;
    const description = document.getElementById("courseDescription").value;
    const link = document.getElementById("courseLink").value;

    const newCourse = {
      title: title,
      description: description,
      link: link,
    };

    try {
      const response = await fetch("/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        loadCourses();
        addCourseForm.reset();
      } else {
        console.error("Erreur lors de l'ajout de la formation");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la formation", error);
    }
  });

  window.deleteCourse = async function (index) {
    try {
      const response = await fetch(`/deleteCourse/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadCourses();
      } else {
        console.error("Erreur lors de la suppression de la formation");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la formation", error);
    }
  };
});
