//selectors
//selects class word-blanks
var wordBlank = document.querySelector(".word-blanks");
//selects class win
var win = document.querySelector(".win");
//selects class lose
var lose = document.querySelector(".lose");
//selects class timer-count
var timerElement = document.querySelector(".timer-count");
//selects class start-button
var startButton = document.querySelector(".start-button");

//objects to hold states
var timerCount;
// variable for if player wins - initialise as false (i.e. player has not won. Set to true when player wins)
var isWin = false;
var winCount = 0;
var loseCount = 0;

//array of words for the user to guess
var words = [
  "JavaScript",
  "just in time",
  "first class functions",
  "non browser environment",
  "node",
  "apache",
  "adobe",
  "prototype",
  "lightweight",
  "interpreted",
  "compiled",
  "programming",
  "language",
  "scripting",
  "web",
  "multi paradigm",
  "single threated",
  "dynamic",
  "object oriented",
  "imperative",
  "declarative",
  "funcational",
  "apis",
  "DOM",
  "ECMAScript",
  "features",
  "MDN",
  "asynchronous",
  "client-side",
  "frameworks",
  "data structures",
  "equality",
  "closures",
  "inheritance",
  "strict",
  "arrays",
  "memory",
  "events",
  "objects",
  "loops",
  "boolean",
  "JSON",
  "math",
  "expressions",
  "operators",
  "statements",
  "declarations",
  "console",
  "browser",
];

//function startGame
function startGame() {
  //when we start the game, we want to set the timerCount to 10
  timerCount = 10;
  //initialise timer text to = timerCount variable
  timerElement.textContent = timerCount;
  //call timer countdown function
  startTimer();
}

//when word is completed, call winGame
function winGame() {
  //replace the word-blank dashes (_) with "YOU WON"
  wordBlank.textContent = "YOU WON!!!";
  //increment winCount by 1
  winCount++;
  setWins();
}

function setWins() {
  //update Wins text to show winCount
  win.textContent = winCount;
  //save in local storage
  localStorage.setItem("winCount", winCount);
}

//get wins from local storage to show to user at start of game
function getWins() {
  //get stored value of winCount from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  //if stored value of winCount doesn't exist, set counter to 0
  if (storedWins === null) {
    winCount - 0;
  } else {
    //if a winCount value is retrieved from client storage set the winCount to that value
    //parseInt to ensure is number, as local storage only stores strings
    winCount = parseInt(storedWins);
  }
  //render win count to page
  win.textContent = winCount;
}

//get lossess from local storage to show user at start of game
function getLosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCount = 0;
  } else {
    loseCount = storedLosses;
  }
  lose.textContent = loseCount;
}

//when timerCount is 0, call loseGame as player has lost
function loseGame() {
  //replace the word-blank dashes (_) with "YOU LOST"
  wordBlank.textContent = "YOU LOST :-( ";
  //increment loseCount by 1
  loseCount++;
  setLosses();
}

function setLosses() {
  //update Losses text to show loseCount
  lose.textContent = loseCount;
  //save in local storage
  localStorage.setItem("loseCount", loseCount);
}

function startTimer() {
  //setInterval function: first argument is function; second argument is number of seconds between calling the function
  var timer = setInterval(function () {
    //increment countdown
    timerCount--;
    //display timer count
    timerElement.textContent = timerCount;

    //if the user has wone, call winGame()
    if (timerCount > 0) {
      //if user has won
      if (isWin) {
        //clear the counter
        clearInterval(timer);
        winGame();
      }
    }

    //when timerCount is zero, stop using clearInterval
    if (timerCount === 0) {
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

//click on start button to start game (call startGame function)
startButton.addEventListener("click", startGame);

function init() {
  getWins();
  getLosses();
}

init();
