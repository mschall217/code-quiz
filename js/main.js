///initializing an array with objects containing questions, answerss, and choices
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        answer: "Alerts",
        choices: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ]
    },
    {
        title: "The condition in an if/else statement is enclosed with:",
        answer: "Parathentesis ()",
        choices: [
            "Quotes",
            "Curly Brackets {}",
            "Parathentesis ()",
            "Square Brackets []"
        ]
    },
    {
        title: "Arrays in javascript can be used to store:",
        answer: "All of the Above",
        choices: [
            "Numbers and Strings",
            "Other Arrays",
            "Booleans",
            "All of the Above"
        ]
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables: ",
        answer: "Quotes",
        choices: [
            "Commas",
            "Curly Brackets {}",
            "Quotes",
            "Parenthesis ()"
        ]
    },
    {
    title: "A very useful tool during development and debugging for printing content to the debugger: ",
    answer: "console.log()",
    choices: [
        "Javascript",
        "Terminal/Bash",
        "For Loops",
        "console.log()"
    ]
    },
]


let score = 0;
let currentQ = 0;
let time = 75;
let hold = 0;
let penalty = 15;

let wrapper = document.querySelector('#wrapper');
let questionsDiv = document.querySelector('#questionsDiv');
let current = document.querySelector('#currentTime');
let timer = document.querySelector('.start');


timer.addEventListener('click', () =>{
    if(hold == 0){
        hold = setInterval(() => {
            time--;
            current.textContent = time;

            if(time <= 0){
                clearInterval(hold);
                endGame()
                current.textContent = 'Time is up!'
            }
        }, 1000)
    }
    render(currentQ)
})

let choiceCreate = document.createElement("ul")

function render(currentQ) {
    questionsDiv.innerHTML = "";
    choiceCreate.innerHTML = "";


    for (let i = 0; i < questions.length; i++) {
        var questionTitle = questions[currentQ].title;
        var questionChoice = questions[currentQ].choices;
        questionsDiv.textContent = questionTitle;
    }
    questionChoice.forEach((element) => {
        let listEl = document.createElement("li");
        listEl.textContent = element;
        questionsDiv.appendChild(choiceCreate);
        choiceCreate.appendChild(listEl);
        listEl.addEventListener("click", (check));
    })
}

function check(event) {
    let e = event.target;

    if (e.matches("li")) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        if (e.textContent == questions[currentQ].answer) {
            score++;
            newDiv.textContent = "Correct!";
        } else {
            time = time - penalty;
            newDiv.textContent = "Wrong!";
        }

    }
    currentQ++;

    if (currentQ >= questions.length) {
        endGame();
        newDiv.textContent = "End of quiz!" + " " + "Score: " + score + "/" + (questions.length*20);
    } else {
        render(currentQ);
    }
    questionsDiv.appendChild(newDiv);

}

const endGame = () => {
    questionsDiv.innerHTML = ''
    current.innerHTML = ''

        let finishedTitle = document.createElement("h2");
        finishedTitle.textContent = "Congrats!"
        questionsDiv.appendChild(finishedTitle);
    
        // Paragraph
        var setFinal = document.createElement("p");
    
        questionsDiv.appendChild(setFinal);
    
        // Calculates time remaining and replaces it with score
        if (time >= 0) {
            let timeRemaining = time;
            let createP = document.createElement("p");
            clearInterval(hold);
            setFinal.textContent = "Your final score is: " + timeRemaining;
    
            questionsDiv.appendChild(createP);
        }
    
        let initialsTitle = document.createElement("label");
        initialsTitle.textContent = "Enter your initials: ";
    
        questionsDiv.appendChild(initialsTitle);
    
        var initalsEl = document.createElement("input");
        initalsEl.setAttribute("type", "text");
        initalsEl.textContent = "";
    
        questionsDiv.appendChild(initalsEl);
    
        var submitEl = document.createElement("button");
        submitEl.setAttribute("type", "submit");
        submitEl.textContent = "Submit";
    
        questionsDiv.appendChild(submitEl);
    
        submitEl.addEventListener("click",() => {
            let initials = initalsEl.value;
    
            if (initials === null) {
    
                alert('Please enter your intials!');
    
            } else {
                let finalScore = {
                    initials: initials,
                    score: time
                }
                //if a zero is received no score recorded
                if(time < 0){
                    score == 0;
                }
                var totalScores = localStorage.getItem("totalScores");
                if (totalScores === null) {
                    totalScores = [];
                } else {
                    totalScores = JSON.parse(totalScores);
                }

                //add users score to code quiz results 
                totalScores.push(finalScore);
                var newScore = JSON.stringify(totalScores);
                localStorage.setItem("totalScores", newScore);
                window.location.replace("./HighScores.html");
            }
        });

}

