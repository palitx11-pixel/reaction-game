const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/game');

const ScoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
    time: Number
});

const Score = mongoose.model('Score', ScoreSchema);

app.post('/score', async (req, res) => {
    const data = new Score(req.body);
    await data.save();
    res.json({ message: "saved" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});app.get('/leaderboard', async (req, res) => {
    const top = await Score.find().sort({score:1}).limit(10);
    res.json(top);
});