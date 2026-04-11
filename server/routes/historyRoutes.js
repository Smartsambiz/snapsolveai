const express = require("express");
const router = express.Router();
const history = require("../config/history");

router.get("/", (req, res) => {
    res.json(history);
});

module.exports = router;