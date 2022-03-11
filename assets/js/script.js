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
// var winCounter;
// var loseCounter;

//function startGame
function startGame() {
  //when we start the game, we want to set the timerCount to 10
  timerCount = 10;
  //initialise timer text to = timerCount variable
  timerElement.textContent = timerCount;
  //call timer countdown function
  startTimer();
}

function startTimer() {
  //setInterval function: first argument is function; second argument is number of seconds between calling the function
  var timer = setInterval(function () {
    //increment countdown
    timerCount--;
    timerElement.textContent = timerCount;
    //when timerCount is zero, stop
    if (timerCount === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

//click on start button to start game (call startGame function)
startButton.addEventListener("click", startGame);
