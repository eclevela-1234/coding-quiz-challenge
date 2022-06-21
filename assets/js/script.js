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

// timer

var countdown = function () {
var time = 30;

var timeInterval = setInterval(function() {
    if (time >= 1) {
        console.log("Time: " + time);
        time--;
    } else {
        console.log("Time: 0");
        clearInterval(timeInterval);
    }
}, 1000)
} 

countdown();