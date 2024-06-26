require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// Database
const db = require("./config/database.js");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(express.static("public"));
app.use(express.json());
const paymentRoutes = require("./module/phonePeModule/index.js");

// Use routes
app.use("/", paymentRoutes);

app.listen(port, () => {
  console.log(`Server running at:${port}`);
});
