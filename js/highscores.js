const backBtn = document.querySelector('#backBtn');
const clearBtn = document.querySelector('#clearBtn');

//adds event to button to go back 
backBtn.addEventListener("click", () => {
    window.location.replace("./index.html")
})

//adds event to clear button to clear out the results
clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});


//gets the array of total scores from local storage and parses them for useable JSON data
let totalScores = localStorage.getItem("totalScores");
totalScores = JSON.parse(totalScores)

//if there are scores in ther then we want to make a list so they can be displayed
if (totalScores !== null) {

    for (let i = 0; i < totalScores.length; i++) {

        let listEl = document.createElement("li");
        listEl.textContent = totalScores[i].initials + " " + totalScores[i].score;
        highScore.appendChild(listEl);

    }
}