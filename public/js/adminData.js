import { users, contacts, courses } from "../js/data-Admin/dataAdmin.js";

const populateTable = (data, tableId) => {
  const tableBody = document.getElementById(tableId);
  data.forEach((item) => {
    const row = `<tr>${Object.values(item)
      .map((value) =>
        typeof value === "string" && value.startsWith("http")
          ? `<td><a href="${value}" target="_blank">Lien</a></td>`
          : `<td>${value}</td>`
      )
      .join("")}</tr>`;
    tableBody.innerHTML += row;
  });
};

populateTable(users, "usersTable");
populateTable(contacts, "contactsTable");
populateTable(courses, "coursesTable");
