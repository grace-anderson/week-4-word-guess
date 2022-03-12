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

var chosenWord = "";

//objects to hold states
var timer;
var timerCount;
// variable for if player wins - initialise as false (i.e. player has not won. Set to true when player wins)
var isWin = false;
var winCount = 0;
var loseCount = 0;
var numBlanks = 0;

//array of words for the user to guess
var words = [
  "javascript",
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
  "dynamic",
  "imperative",
  "declarative",
  "functional",
  "api",
  "features",
  "asynchronous",
  "client",
  "frameworks",
  "data",
  "equality",
  "closures",
  "inheritance",
  "strict",
  "array",
  "memory",
  "events",
  "objects",
  "loops",
  "boolean",
  "math",
  "expressions",
  "operators",
  "statements",
  "declarations",
  "console",
  "browser",
  "modulus",
  "variable",
  "string",
  "object",
];
//declare variables used by renderBlanks and checkLetters
var lettersInChosenWord = [];
var blanksArray = [];

//display the blanks before user guesses words
function renderBlanks() {
  //randomly choose a word from words array
  chosenWord = words[Math.floor(Math.random() * words.length)];
  // //test
  // console.log(chosenWord);
  //split up the chosen word into its characters
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = [];
  //loop to push blanks to blanksLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  //convert blanksLetters array into a string and render it on the screen
  wordBlank.textContent = blanksLetters.join(" ");
}

function checkWin() {
  //if the word = blanksLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    //isWin value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

//check to see if user-entered letters match letters in randomly chosenWord
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

//attach event listener that listens for keydown event
document.addEventListener("keydown", function (event) {
  //if the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  //Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphaNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split(
    ""
  );
  //Test if key pushed is alphanumeric
  if (alphaNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

//function startGame
function startGame() {
  //initialise isWin back to false each time Start button clicked
  isWin = false;
  //when we start the game, we want to set the timerCount to 10
  timerCount = 12;
  //initialise timer text to = timerCount variable
  timerElement.textContent = timerCount;
  startButton.disabled = false;
  //call timer countdown function
  startTimer();
  renderBlanks();
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
  startButton.disabled = false;
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
  timer = setInterval(function () {
    //increment countdown
    timerCount--;
    //display timer count
    timerElement.textContent = timerCount;

    //if the user has wone, call winGame()
    if (timerCount >= 0) {
      //if user has won
      if (isWin && timerCount > 0) {
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

//call init when loading the page
//init is in the ROOT, so will get called by the page
init();

//Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCount = 0;
  loseCount = 0;
  // Renders win and loss counts and sets them into client storage
  setWins();
  setLosses();
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
