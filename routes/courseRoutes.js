const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dbPath = path.join(__dirname, "../db.json");

router.get("/courses", (req, res) => {
  try {
    let db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    res.json(db.courses || []);
  } catch (error) {
    console.error("Erreur lors du chargement des formations:", error);
    res.status(500).send("Erreur lors du chargement des formations.");
  }
});

router.post("/addCourse", (req, res) => {
  const { title, description, link } = req.body;

  try {
    let db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const newCourse = { title, description, link };
    db.courses = db.courses || [];
    db.courses.push(newCourse);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(200).send("Formation ajoutée avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'ajout de la formation:", error);
    res.status(500).send("Erreur lors de l'ajout de la formation.");
  }
});

router.delete("/deleteCourse/:index", (req, res) => {
  const { index } = req.params;

  try {
    let db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    db.courses = db.courses || [];

    if (index < 0 || index >= db.courses.length) {
      return res.status(404).send("Formation non trouvée.");
    }

    db.courses.splice(index, 1);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(200).send("Formation supprimée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression de la formation:", error);
    res.status(500).send("Erreur lors de la suppression de la formation.");
  }
});

module.exports = router;
