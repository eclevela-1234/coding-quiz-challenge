// Quiz object
var quiz = [
  {
    question:
      "Located in Indonesia, _________ is the world’s most populous island, home to over 148 million people.",
    choices: ["HTML", "Java", "JavaScript", "CSS", "Australia"],
    answer: "Java",
  },
  {
    question:
      "The __________ is the standard juggling pattern and also a principle for styling properties of web pages.",
    choices: ["Half-shower", "Shower", "Site Swap", "Cascade"],
    answer: "Cascade",
  },
  {
    question:
      "This US Vice-President infamously claimed they “took initiative in creating the internet” while on the campaign trail for presidential candidacy:",
    choices: ["Kamala Harris", "Dan Quayle", "Spiro Agnew", "Al Gore"],
    answer: "Al Gore",
  },
  {
    question: "True or False: jQuery is a men's fashion deligner.",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    question: "The road to hell is paved with ____________",
    choices: ["Legacy Code", "CSS Refactoring", "Good Intentions", "Boot Camp Challenges"],
    answer: "Good Intentions",
  },
  {
    question: "Sorting Key Value pairs numerically (such as a high score array) using JavaScript is  ____________",
    choices: ["Easy", "Hard", "Impossible", "Convoluted"],
    answer: "Convoluted",
  },
  {
    question: "In the world of coding, Practice makes ____________",
    choices: ["imperfect", "frustrated", "a good debugger/Googler", "All of the above"],
    answer: "All of the above",
  },
  
];

// Global Vars

var time = 45;
var questionIncrementer = 0;

//element vars
var timerEl = document.getElementById("timer");
var highScoreEl = document.getElementById("high-scores");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var answerEl = document.getElementById("answer");
var dialogEl = document.getElementById("dialog");
var quizBoxEl = document.getElementById("quiz-box");
var inputEl = document.createElement("input");

// Initialized Score Obj/arr
var playerScore = {};
var scoresArr = [];

// Page builds

// landing screen and start
var beginQuiz = function () {
  questionEl.textContent = "Coding Quiz Challenge";
  dialogEl.innerHTML =
    "Try and beat the high score! Answer questions as accurately and quickly as possible. Time will be deducted for incorrect responses";
  var startEl = document.createElement("button");
  startEl.className = "btn";
  startEl.textContent = "Begin!";
  choicesEl.appendChild(startEl);
};

// display questions
var displayQuestions = function () {
  initializeElements();
  questionEl.textContent = quiz[questionIncrementer].question;
  for (i = 0; i < quiz[questionIncrementer].choices.length; i++) {
    var listChoiceEl = document.createElement("li");
    listChoiceEl.textContent = quiz[questionIncrementer].choices[i];
    listChoiceEl.className = "btn";
    choicesEl.appendChild(listChoiceEl);
  }
  questionIncrementer++;
};

// end of quiz, display score
var endQuiz = function () {
  initializeElements();
  questionEl.textContent = "All Done!";
  dialogEl.innerHTML =
    "Your final score is " + savedTime + "! <br><br> Enter your name! <br><br>";
  // create input element
  inputEl.setAttribute("type", "text");
  dialogEl.appendChild(inputEl);
  var logEl = document.createElement("button");
  logEl.className = "btn";
  logEl.textContent = "Log Score";
  choicesEl.appendChild(logEl);
};

//show scores at end and if event clicked
var showScores = function () {
  initializeElements();
  questionEl.textContent = "High Scores";
  var startEl = document.createElement("button");
  startEl.className = "btn";
  startEl.textContent = "Begin!";
  choicesEl.appendChild(startEl);
  if (!scoresArr[0]) {
    return;
  }

  for (i = 0; i < scoresArr.length; i++) {
    var ScoresEl = document.createElement("li");
    ScoresEl.textContent = scoresArr[i].Player + " - " + scoresArr[i].Score;
    dialogEl.appendChild(ScoresEl);
  }
};

// background functions below

// element initializer - D.R.Y.
var initializeElements = function () {
  dialogEl.innerHTML = "";
  choicesEl.innerHTML = "";
  questionEl.textContent = "";
};

//load scores
var loadScores = function () {
  scoresObj = localStorage.getItem("scoresObj");
  if (!scoresObj) {
    console.log("there is no data");
    return;
  }
  scoresArr = JSON.parse(scoresObj);
};

// timer function
var countdown = function () {
  var timeInterval = setInterval(function () {
    if (time >= 1) {
      timerEl.textContent = "Time: " + time;
      time--;
    } else {
      timerEl.textContent = "Time: " + time;
      clearInterval(timeInterval);
    }
  }, 1000);
};

// Button Handler - lot going on here

var buttonHandler = function (event) {
  var targetEl = event.target;
  if (targetEl.textContent === "Log Score") {
    var playerScore = { Player: inputEl.value, Score: savedTime };
    scoresArr.push(playerScore);
    localStorage.setItem("scoresObj", JSON.stringify(scoresArr));
    showScores();
  } else if (targetEl.textContent === "Begin!") {
    countdown();
    questionIncrementer = 0;
    displayQuestions();
  } else if (targetEl.textContent !== quiz[questionIncrementer - 1].answer) {
    time = time - 5;
    if (questionIncrementer < quiz.length) {
      answerEl.textContent = "Wrong!";
      displayQuestions();
    } else {
      savedTime = time;
      time = 0;
      endQuiz();
    }
  } else {
    if (questionIncrementer < quiz.length) {
      answerEl.textContent = "Correct!";
      displayQuestions();
    } else {
      savedTime = time;
      time = 0;
      endQuiz();
    }
  }
};

// event listeners
choicesEl.addEventListener("click", buttonHandler);
highScoreEl.addEventListener("click", showScores);

// function call to load page
loadScores();
beginQuiz();
