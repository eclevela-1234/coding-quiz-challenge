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

    if (targetEl.textContent === "Begin!") {
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
    dialogEl.textContent = "Your final score is " + savedTime + "!";
    // dialogEl.innerHTML = "<label for ='person'>Enter Name Here: </label>"
    // var inputEl = document.createElement("input");
    // inputEl.setAttribute("name", "person");
   
    // dialogEl.appendChild(inputEl);
    // var person = inputEl.textContent;
    // console.log(person);
}
choicesEl.addEventListener("click", buttonHandler);
beginQuiz();
