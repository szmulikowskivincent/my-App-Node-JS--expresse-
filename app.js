const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", contactRoutes);
app.use("/", dashboardRoutes);

app.get("/courses", (req, res) => {
  try {
    let db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    res.json(db.courses || []);
  } catch (error) {
    console.error("Erreur lors du chargement des formations:", error);
    res.status(500).send("Erreur lors du chargement des formations.");
  }
});

app.post("/addCourse", (req, res) => {
  const { title, description, link } = req.body;

  try {
    let db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    const newCourse = { title, description, link };
    db.courses = db.courses || [];
    db.courses.push(newCourse);

    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
    res.status(200).send("Formation ajoutée avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'ajout de la formation:", error);
    res.status(500).send("Erreur lors de l'ajout de la formation.");
  }
});

app.delete("/deleteCourse/:index", (req, res) => {
  const { index } = req.params;

  try {
    let db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    db.courses = db.courses || [];

    if (index < 0 || index >= db.courses.length) {
      return res.status(404).send("Formation non trouvée.");
    }

    db.courses.splice(index, 1);

    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

    res.status(200).send("Formation supprimée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression de la formation:", error);
    res.status(500).send("Erreur lors de la suppression de la formation.");
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
