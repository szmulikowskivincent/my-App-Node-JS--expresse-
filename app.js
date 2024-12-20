const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const coursesRoutes = require("./routes/courseRoutes");
const registerRoutes = require("./routes/registerRoutes");

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", contactRoutes);
app.use("/", dashboardRoutes);
app.use("/", coursesRoutes);
app.use("/", registerRoutes);

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
