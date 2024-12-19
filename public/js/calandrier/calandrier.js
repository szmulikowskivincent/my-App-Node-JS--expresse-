document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const header = document.createElement("div");
  header.classList.add("header");
  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    header.appendChild(dayElement);
  });
  calendarContainer.appendChild(header);

  function generateCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const days = calendarContainer.querySelectorAll(".day");
    days.forEach((day) => day.remove());

    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDiv = document.createElement("div");
      calendarContainer.appendChild(emptyDiv);
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.textContent = i;

      const now = new Date();
      if (
        i === now.getDate() &&
        month === now.getMonth() &&
        year === now.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      dayDiv.addEventListener("click", () => {
        alert(`You clicked on ${i}`);
      });
      calendarContainer.appendChild(dayDiv);
    }
  }

  const now = new Date();
  generateCalendar(now.getMonth(), now.getFullYear());
});
