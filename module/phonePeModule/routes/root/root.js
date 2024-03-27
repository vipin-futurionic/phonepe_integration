const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.json({ "message": "Welcome to PhonePe" });
});

module.exports = router;