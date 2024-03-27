// routes.js
const express = require("express");
const router = express.Router();

// Import route handlers
const rootRoute = require("./routes/root/root.js");
const paymentRoute = require("./routes/paymentRoutes/paymentRoute");
const redirectRoute = require("./routes/paymentRoutes/redirectRoute");

// Route handlers
router.use("/", rootRoute);
router.use("/pay", paymentRoute);
router.use("/redirect-url", redirectRoute);

module.exports = router;
