const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dbPath = path.join(__dirname, "../db.json");

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || password.length < 5) {
    return res
      .status(400)
      .send("Le nom d'utilisateur ou le mot de passe est invalide");
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Erreur lors du cryptage du mot de passe");
    }

    const newUser = {
      username,
      password: hashedPassword,
    };

    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          return fs.writeFile(
            dbPath,
            JSON.stringify([newUser], null, 2),
            "utf8",
            (err) => {
              if (err) {
                return res
                  .status(500)
                  .send("Erreur lors de l'enregistrement de l'utilisateur");
              }
              return res.send("Utilisateur enregistré avec succès");
            }
          );
        }

        return res
          .status(500)
          .send("Erreur lors de la lecture du fichier de la base de données");
      }

      let users = [];
      try {
        if (data) {
          users = JSON.parse(data);
        }
      } catch (parseError) {
        return res
          .status(500)
          .send("Erreur lors du parsing du fichier db.json");
      }

      if (users.some((user) => user.username === username)) {
        return res.status(400).send("Nom d'utilisateur déjà pris");
      }

      users.push(newUser);

      fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf8", (err) => {
        if (err) {
          return res
            .status(500)
            .send("Erreur lors de l'enregistrement de l'utilisateur");
        }

        res.send("Utilisateur enregistré avec succès");
      });
    });
  });
});

module.exports = router;
