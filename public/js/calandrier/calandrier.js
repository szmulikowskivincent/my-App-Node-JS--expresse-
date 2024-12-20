document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const modalMessage = document.getElementById("modal-message");

  const unavailableDates = [5, 10, 15, 20];
  const availableDates = [3, 7, 13, 18];

  const formations = {
    3: "Angular Basics - 10:00 AM",
    7: "Angular Advanced - 2:00 PM",
    13: "Angular for Professionals - 11:00 AM",
    18: "Angular Workshop - 1:00 PM",
  };

  function generateCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    calendarContainer.innerHTML = "";

    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDiv = document.createElement("div");
      calendarContainer.appendChild(emptyDiv);
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.textContent = i;

      if (formations[i]) {
        dayDiv.setAttribute("title", formations[i]);
      }

      if (unavailableDates.includes(i)) {
        dayDiv.classList.add("unavailable");
      } else if (availableDates.includes(i)) {
        dayDiv.classList.add("available");
      }

      const now = new Date();
      if (
        i === now.getDate() &&
        month === now.getMonth() &&
        year === now.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      dayDiv.addEventListener("click", () => {
        let status = "unavailable";
        if (availableDates.includes(i)) {
          status = "available";
        }
        const alertMessage = `
          <span class="alert-icon"></span>
          You clicked on ${i} and the training is ${
          status === "available" ? "available" : "unavailable"
        }.
        `;
        modalMessage.innerHTML = alertMessage;
      });
      calendarContainer.appendChild(dayDiv);
    }
  }

  const now = new Date();
  generateCalendar(now.getMonth(), now.getFullYear());
});
