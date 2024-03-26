require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(express.static("public"));
app.use(express.json());

app.use("/", require("./routes/root"));
app.use("/pay", require("./routes/paymentRoutes/paymentRoute"));
app.use("/redirect-url", require("./routes/paymentRoutes/redirectRoute"));

app.listen(port, () => {
  console.log(`Server running at:${port}`);
});
