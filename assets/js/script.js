

var startButton = document.querySelector('#start');
var timeLeft = 60;
var timerEl = document.querySelector('#timer');
var highScores = [];
var initials = [];

//building key value pairs array for highScores
var i;
var currentKey;
var currentValue;
var result = {};

function buildHighScores() {
  for (i = 0; i < highScores.length; i++) {
    currentKey = initials[i];
    currentValue = highScores[i];
    result[currentKey] = currentValue;
    return result;
  }
}
//console.log(result);
var viewResults = document.querySelector('#viewHighScores');
var list = document.getElementById('list');

viewResults.addEventListener('click', function() {
  list.innerHTML = data.map(i => `<li>${i}</li>`).join('')
});

function setCounterText() {
  timerEl.textContent = timeLeft;
}

startButton.addEventListener('click', function() {

    var timeInterval = setInterval(function() {
      timerEl.textContent = timeLeft;
      timeLeft--;
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft;
      } else if (timeLeft === 1 ) {
        timeLeft.textContent = timeLeft;
      } else {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        setCounterText();
      }
    }, 1000);

  document.getElementById('quizWrap').style.display = 'block';
  document.getElementById('start').style.display = 'none';
  document.getElementById('h3El').style.display = 'none';
});

var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "What is HTML?",
    o : [
      "Hyper text make lines",
      "Hyper text markup language",
      "Hit the mike Larry",
      "Hourly time markup language",
    ],
    a : 1 // arrays start with 0, so answer is 70 meters
  },
  {
    q : "What is CSS?",
    o : [
      "Cyber security system",
      "Cable style safe",
      "Doesn't mean anything",
      "Cascading stylesheet"
    ],
    a : 3
  },
  {
    q : "What is a popular technology for software version control?",
    o : [
      "Amazon web service",
      "Google drive",
      "Git",
      "Dropbox",
    ],
    a : 2
  },
  {
    q : "What is the term for a software engineer that does front end and back end development?",
    o : [
      "Full stack",
      "End to end",
      "Master engineer",
      "None of the above"
    ],
    a : 0
  },
  {
    q : "What is a funny HBO show about a software startup?",
    o : [
      "Beverly Hills 90210",
      "Devcon 2050",
      "Tech start valley",
      "Silicon Valley",
    ],
    a : 3
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) QUIZ FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
      timeLeft = timeLeft - 5;
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
        // save score prompt
        var saveScore = window.confirm('Would you like to save your score?');
        if (saveScore) {
          var userInitials = window.prompt("Please enter your initials!");
        }
        // saving score and initials into arrays
        highScores.push(quiz.score);
        initials.push(userInitials);
        buildHighScores();
        console.log(highScores);
        console.log(initials);
        console.log(result);
      }
    }, 500);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);


