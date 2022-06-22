
var quiz  = [
    {question: "Located in Indonesia, _________ is the world’s most populous island, home to over 148 million people.",
    choices: ["HTML", "Java", "JavaScript", "CSS", "Australia"],
    answer: "Java"
    },
    {question: "The __________ is the standard juggling pattern and also a principle for styling properties of web pages.",
    choices: ["Half-shower", "Shower", "Site Swap", "Cascade"],
    answer: "Cascade"},
    {question: "This US Vice-President infamously claimed they “took initiative in creating the internet” while on the campaign trail for presidential candidacy:",
    choices: ["Kamala Harris", "Dan Quayle", "Spiro Agnew", "Al Gore"],
    answer: "Al Gore"}
];
var time = 30;
//Question Incrementer
var questionIncrementer = 0 

//element vars
var timerEl = document.getElementById('timer');
var highScoreEl = document.getElementById('high-scores');
var questionEl = document.getElementById('question');
var choicesEl = document.getElementById('choices');
var answerEl = document.getElementById('answer');
var dialogEl = document.getElementById('dialog');
var quizBoxEl = document.getElementById("quiz-box");
var inputEl = document.createElement('input');

// timer
var countdown = function () {


var timeInterval = setInterval(function() {
    if (time >= 1) {
        timerEl.textContent = "Time: " + time;
        time--;
    } else {
        timerEl.textContent = "Time: " + time;
        clearInterval(timeInterval);
    }
}, 1000)
} 


// display question
var displayQuestions = function() {
    
    dialogEl.innerHTML = "";
    choicesEl.innerHTML = "";
    questionEl.textContent = quiz[questionIncrementer].question;
    for (i=0; i < quiz[questionIncrementer].choices.length; i++) {
        var listChoiceEl = document.createElement("li");
        listChoiceEl.textContent = quiz[questionIncrementer].choices[i];
        listChoiceEl.className = "btn"
        choicesEl.appendChild(listChoiceEl);
    }
    questionIncrementer++;
};
var buttonHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.textContent === "Log Score") {
        
        var playerScore = [inputEl.value, savedTime]
        console.log(playerScore);
    }

    else if (targetEl.textContent === "Begin!") {
        countdown();
        questionIncrementer = 0;
        displayQuestions();
    }
    else if (targetEl.textContent !== quiz[questionIncrementer-1].answer) {
        time = time - 5;
        if (questionIncrementer < quiz.length) {
            answerEl.textContent = "Wrong!";
            displayQuestions();
        } else {
            savedTime = time; 
            time = 0;
            endQuiz();

        }
    }
    else {
        if (questionIncrementer < quiz.length) {
            answerEl.textContent = "Correct!";
            displayQuestions();
        } else {
            savedTime = time; 
            time = 0;
            endQuiz();
        }
    }
}
// landing screen and start
var beginQuiz = function() {
    questionEl.textContent = "Coding Quiz Challenge"
    
    dialogEl.innerHTML = "Try and beat the high score! Answer questions as accurately and <br> quickly as possible. Time will be deducted for incorrect responses"; 
    var startEl = document.createElement("button");
    startEl.className = "btn";
    startEl.textContent = "Begin!";
    choicesEl.appendChild(startEl);
    };
var endQuiz = function(){
    
    answerEl.textContent = ""
    dialogEl.innerHTML = "";
    choicesEl.innerHTML = "";
    questionEl.textContent = "All Done!"
    dialogEl.innerHTML = "Your final score is " + savedTime + "! <br><br> Enter your name! <br><br>";
    // create form element
    
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "name");
    
    dialogEl.appendChild(inputEl);
    var logEl = document.createElement("button");
    logEl.className = "btn";
    logEl.textContent = "Log Score";
    choicesEl.appendChild(logEl);

 }

 var highscorehandler = function(event) {
    event.preventDefault();
    console.log(event.target.value);
}
choicesEl.addEventListener("click", buttonHandler);
inputEl.addEventListener("submit", highscorehandler)
beginQuiz();
