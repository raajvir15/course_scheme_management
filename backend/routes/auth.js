const express = require("express");
const router = express.Router();
const db = require("../db");

// REGISTER ROUTE
router.post("/register", (req, res) => {
  const { username, password, role, branch, semester } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, msg: "Missing required fields" });
  }

  const query = `
    INSERT INTO users (username, password, role, branch, semester)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [username, password, role, branch || null, semester || null], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: "User already exists or DB error" });
    }
    res.json({ success: true, msg: "User registered!" });
  });
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, msg: "Database error" });

      if (results.length === 0) {
        return res.status(401).json({ success: false, msg: "Invalid credentials" });
      }

      const user = results[0];

      res.json({
        success: true,
        role: user.role,
        branch: user.branch,
        semester: user.semester
      });
    }
  );
});

module.exports = router;
