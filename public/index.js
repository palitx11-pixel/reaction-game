const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// เปิดหน้าเว็บ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// เก็บคะแนน
let scores = [];

app.post("/score", (req, res) => {
  const { name, score } = req.body;
  scores.push({ name, score });

  scores.sort((a, b) => b.score - a.score);

  res.json(scores.slice(0, 5));
});

// ดึง leaderboard
app.get("/leaderboard", (req, res) => {
  res.json(scores.slice(0, 5));
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});