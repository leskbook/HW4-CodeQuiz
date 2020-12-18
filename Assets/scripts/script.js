// Array for questions and multiple choice answers

var questions = [{
        question: "What does Woody from Toy Story have on his boot?",
        choices: ["A map of the US", "His home address", "Andy", "Mom"],
        answer: "Andy"
    },
    {
        question: "Whose tea party does Alice attend?",
        choices: ["The artist formerly known as Prince", "Kim Kardashian", "President Trump", "The Mad Hatter"],
        answer: "The Mad Hatter"
    },
    {
        question: "What puts Snow White into a deep sleep?",
        choices: ["javascripting", "a poison apple", "watching presidential debates", "a date with Sleepy"],
        answer: "a poison apple"
    },
    {
        question: "What animal swallowed a clock in Peter Pan?",
        choices: ["a rabid hamster", "a confused beaver", "a crocodile", "a hungry hungry hippo"],
        answer: "a crocodile"
    },
    {
        question: "What city is nicknamed Sin City?",
        choices: ["Las Vegas", "Salt Lake City", "Baltimore", "San Francisco"],
        answer: "Las Vegas"
    },
    {
        question: "What did Amelia Earhart do to make her famous?",
        choices: ["Won an all you can eat wing contest", "was an accomplished female pilot", "learned javascripting overnight", "was a scuba instructor"],
        answer: "was an accomplished female pilot"
    },
    {
        question: "Which president made Thanksgiving and annual holiday in November?",
        choices: ["Obama", "Clinton", "Lincoln", "Washington"],
        answer: "Lincoln"
    }
];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");


timer.addEventListener("click", function() {

    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function(newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "Game Over" + " " + "Good work--> " + score + " of " + questions.length + " Correct";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Game Over!";

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }


    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./hs.html");
        }
    });

}