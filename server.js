const express = require("express");
const cors = require("cors");
const db = require("./db/dbConnection");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

/* ===== SAVE ===== */
app.post("/save", (req, res) => {
  const { name, email, address, phone } = req.body;

  const sql =
    "INSERT INTO students (name, email, address, phone) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, address, phone], (err) => {
    if (err) return res.status(500).json({ message: "Save failed" });
    res.status(201).json({ message: "Student saved" });
  });
});

/* ===== GET ALL ===== */
app.get("/getAll", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(result);
  });
});

/* ===== UPDATE ===== */
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;

  console.log(id)
  const sql =
    "UPDATE students SET name=?, email=?, address=?, phone=? WHERE id=?";

  db.query(sql, [name, email, address, phone, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student updated" });
  });
});

/* ===== DELETE ===== */
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted" });
  });
});

app.get("/getById/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM students WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (result.length === 0)
      return res.status(404).json({ message: "Student not found" });
    res.json(result[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
