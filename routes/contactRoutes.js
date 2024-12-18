const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "contact.html"));
});

router.post("/contact", (req, res) => {
  const { firstName, lastName, status, reason } = req.body;
  try {
    let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

    db.contacts.push({ firstName, lastName, status, reason });
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

    res.send("<h1>Merci de nous avoir contacté!</h1>");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du contact:", error);
    res
      .status(500)
      .send("Une erreur est survenue lors de l'enregistrement du contact.");
  }
});

module.exports = router;
