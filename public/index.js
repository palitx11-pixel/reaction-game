const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let scores = [];

app.post("/score", (req, res) => {
  const { name, score } = req.body;

  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);

  res.json(scores.slice(0, 5)); // ส่งอันดับกลับทันที
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});