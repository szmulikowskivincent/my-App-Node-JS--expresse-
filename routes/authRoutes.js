const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const router = express.Router();

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

    if (db.users.some((user) => user.username === username)) {
      return res.send(`
        <script>
          alert("L'utilisateur existe déjà. Veuillez vous connecter.");
          window.location.href = "/login";
        </script>
      `);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.users.push({ username, password: hashedPassword });
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).send("Une erreur est survenue lors de l'inscription.");
  }
});

// Route de connexion
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

    const user = db.users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).send("Nom d'utilisateur ou mot de passe invalide");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Nom d'utilisateur ou mot de passe invalide");
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).send("Une erreur est survenue lors de la connexion.");
  }
});

module.exports = router;
