const express = require("express");
const router = express.Router();
const db = require("../db");

// GET COURSES
router.get("/", (req, res) => {
    const role = req.query.role;
    const branch = req.query.branch;
    const semester = req.query.semester;

    let sql = "";
    let params = [];

    if (role === "student") {
        sql = "SELECT * FROM courses WHERE branch = ? AND semester = ?";
        params = [branch, semester];
    }
    else if (role === "faculty") {
        sql = "SELECT * FROM courses WHERE branch = ?";
        params = [branch];
    }
    else {
        sql = "SELECT * FROM courses"; // admin sees all
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("GET COURSES ERROR:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// ADD COURSE
router.post("/", (req, res) => {
    const { course_code, course_name, L, T, P, credits, branch, semester } = req.body;

    const sql = `
        INSERT INTO courses 
        (course_code, course_name, L, T, P, credits, branch, semester)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [course_code, course_name, L, T, P, credits, branch, semester],
        (err, result) => {
            if (err) {
                console.error("ADD COURSE ERROR:", err);
                return res.status(500).json({ error: "Insert failed" });
            }
            res.json({ success: true, msg: "Course added!" });
        }
    );
});

// DELETE COURSE
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM courses WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("DELETE COURSE ERROR:", err);
            return res.status(500).json({ error: "Delete failed" });
        }
        res.json({ success: true, msg: "Course deleted!" });
    });
});

module.exports = router;
