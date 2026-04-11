const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM history ORDER BY timestamp DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching history:", err);
        return res.status(500).json({ error: "Failed to fetch history" });
    }
});

module.exports = router;