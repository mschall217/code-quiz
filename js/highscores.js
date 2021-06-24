const backBtn = document.querySelector('#backBtn');
const clearBtn = document.querySelector('#clearBtn');

backBtn.addEventListener("click", () => {
    window.location.replace("./index.html")
})

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

let totalScores = localStorage.getItem("totalScores");
totalScores = JSON.parse(totalScores)

if (totalScores !== null) {

    for (let i = 0; i < totalScores.length; i++) {

        let listEl = document.createElement("li");
        listEl.textContent = totalScores[i].initials + " " + totalScores[i].score;
        highScore.appendChild(listEl);

    }
}