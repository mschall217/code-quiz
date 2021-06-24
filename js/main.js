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
let penalty = 10;
//setting inital values

let wrapper = document.querySelector('#wrapper');
let questionsDiv = document.querySelector('#questionsDiv');
let current = document.querySelector('#currentTime');
let timer = document.querySelector('.start');
//grabbing elements from the HTML 

timer.addEventListener('click', () =>{
    //creating the time elemenet using setInterval funciton
    if(hold == 0){
        hold = setInterval(() => {
            time--;
            //every 1 second subtract 1 
            current.textContent = time;
            //display in HTML 

            if(time <= 0){
                clearInterval(hold);
                endGame()
                //if it gets to 0 clear the timer and run endGame 
                current.textContent = 'Time is up!'
            }
        }, 1000) //will count down by 1 second till it reaches 0 
    }
    render(currentQ)
})

let choiceCreate = document.createElement("ul")
//rendering the questions on the whole page 
function render(currentQ) {
    questionsDiv.innerHTML = "";
    choiceCreate.innerHTML = "";

    //for every question display title and choices
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
        //when choices are displayed and clicked on run through check to see if user is correct 
    })
}

function check(event) {
    let e = event.target;
    //function to check if users current choice matches the correct choice 
    if (e.matches("li")) {

        var newDiv = document.createElement("div");
        //creating a new div elemenet to display correct or incorrect
        if (e.textContent == questions[currentQ].answer) {
            //if the users choice (clicked on event) matches the answer increase score and display correct 
            score++;
            newDiv.textContent = "Correct!";
        } else {
            //if it does not then we are subtracting the penalty from the time aka their score
            time = time - penalty;
            newDiv.textContent = "Wrong!";
        }

    }
    currentQ++;

    if (currentQ >= questions.length) {
        //no more questions? end the game display score
        endGame();
        newDiv.textContent = "End of quiz!" + " " + "Score: " + score + "/" + (questions.length*20);
    } else {
        //or keep rendering questions
        render(currentQ);
    }
    //append the corrext or incorrect div
    questionsDiv.appendChild(newDiv);

}

const endGame = () => {
    questionsDiv.innerHTML = ''
    current.innerHTML = ''
    //setting these to emptyy
        let finishedTitle = document.createElement("h2");
        finishedTitle.textContent = "Congrats!"
        questionsDiv.appendChild(finishedTitle);
        //created a finsihed title
    
        //creating a p tag to hold the users final scores
        var setFinal = document.createElement("p");
        questionsDiv.appendChild(setFinal);
    
        // Calculates time remaining and replaces it with score
        if (time >= 0) {
            let timeRemaining = time;
            let finalP = document.createElement("p");
            clearInterval(hold);
            setFinal.textContent = "Your final score is: " + timeRemaining;
            
            questionsDiv.appendChild(finalP);
        }
        //createing a lable to prompt the user for their initals
        let initialsTitle = document.createElement("label");
        initialsTitle.textContent = "Enter your initials: ";
        questionsDiv.appendChild(initialsTitle);
    
        //creating an input box for the user to actually enter those initials 
        var initalsEl = document.createElement("input");
        initalsEl.setAttribute("type", "text");
        initalsEl.textContent = "";
        questionsDiv.appendChild(initalsEl);
    
        //creating a submit button so that when the user enters the intitals they can submit them with the score
        var submitEl = document.createElement("button");
        submitEl.setAttribute("type", "submit");
        submitEl.textContent = "Submit";
        questionsDiv.appendChild(submitEl);
    

        //adding the event listener to that button that tells the program to store their initials and scores
        submitEl.addEventListener("click",() => {
            let initials = initalsEl.value;
    
            if (initials === null) {
                //alert user no initals were entered score will be recorded empty
                window.alert('No Initals Entered!');
    
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

                //total scores is the array of all ppl who have taken the quiz, pushing the latest score to it and redirecting to high score pages
                totalScores.push(finalScore);
                var newScore = JSON.stringify(totalScores);
                localStorage.setItem("totalScores", newScore);
                window.location.replace("./HighScores.html");
            }
        });

}

