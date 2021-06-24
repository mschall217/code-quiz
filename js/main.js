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


let score = 0
let currentQ = -1
let time;
let timer;

//adds 20 points to the score for every right 
const correct = () => {
    score += 20;
    game();
}

//subtracts 10 seconds from the time for every wrong answer 
const incorrect = () => {
    time -= 10;
    game();
}


const game = () => {
    currentQ++;
    //if current question being displayed is the last one then end the game
    if(currentQ > questions.length -1){
        // function to end the game 
        return;
    }
    let questionEL = '<h3>' + questions[currentQ].title + '</h3>' 

    for (var i = 0; i < questions[currentQ].choices.length; i++) {
        var buttonEl = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonEl = buttonEl.replace("[CHOICE]", questions[currentQ].choices[i]);
        if (questions[currentQ].choices[i] == questions[currentQ].answer) {
            buttonEl = buttonEl.replace("[ANS]", "correct()");
        } else {
            buttonEl = buttonEl.replace("[ANS]", "incorrect()");
        }
        questionEL += buttonEl
    }


    document.querySelector('#questionsDiv').innerHTML = questionEL

}

const startQuiz = () =>{
    let time = 10;
    document.querySelector('#currentTime').innerHTML = time
    //sets timer on the main page to reflect the start time 75 seconds
    timer = setInterval(()=>{
        time--;
        document.querySelector('#currentTime').innerHTML = time
        //as time decreased it changes the HTML 
        if(time <=0){
            clearInterval(timer);
            //stops the timer at 0 
            return;
            //function to end the game will go here. 
        }
    }, 1000)
    
    game();

}

const startBtn = document.querySelector(".start")
startBtn.addEventListener("click", startQuiz())



