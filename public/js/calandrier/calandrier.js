document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const modalMessage = document.getElementById("modal-message");

  // Example of unavailable and available dates
  const unavailableDates = [5, 10, 15, 20]; // Non-disponible
  const availableDates = [3, 7, 13, 18]; // Disponible

  function generateCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Empty the calendar
    calendarContainer.innerHTML = "";

    // Add empty divs for the days before the 1st of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDiv = document.createElement("div");
      calendarContainer.appendChild(emptyDiv);
    }

    // Add the days of the current month
    for (let i = 1; i <= numDaysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.textContent = i;

      // Color coding based on availability
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

      // Handle click to show modal message
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
        // Show modal message dynamically
      });
      calendarContainer.appendChild(dayDiv);
    }
  }

  const now = new Date();
  generateCalendar(now.getMonth(), now.getFullYear());
});
