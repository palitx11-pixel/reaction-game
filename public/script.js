let startTime;

const startBtn = document.getElementById("start");
const target = document.getElementById("target");
const result = document.getElementById("result");

startBtn.onclick = () => {
    result.innerText = "รอ...";
    target.style.display = "none";

    let delay = Math.random() * 3000 + 1000;

    setTimeout(() => {
        target.style.display = "block";
        startTime = Date.now();
    }, delay);
};

target.onclick = () => {
    let reaction = Date.now() - startTime;

    result.innerText = "เวลา: " + reaction + " ms";

    sendScore(reaction);

    target.style.display = "none";

    loadLeaderboard();
};

function sendScore(time) {
    const name = document.getElementById("name").value || "player";

    fetch('/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            score: time,
            time: Date.now()
        })
    });
}

function loadLeaderboard() {
    fetch('/leaderboard')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("leaderboard");
        list.innerHTML = "";

        data.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item.name + " - " + item.score + " ms";
            list.appendChild(li);
        });
    });
}

loadLeaderboard();