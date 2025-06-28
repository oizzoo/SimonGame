// -------------------- Global Game Variables --------------------
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let currentVolume = 0.3;
let level = 0;
let started = false;
let highScore = localStorage.getItem("highScore") || 0;

// -------------------- Document Ready --------------------
$(document).ready(function() {
  $(".container").hide();
  $("#current-score").hide();
  $("#high-score").text("Your Best Score: " + highScore);
  $("#reset-score").hide();
  $("#start-btn").show();

  // Add floating text effect to the start message
  $("#level-title").addClass("floating-text");

  attachStartHandlers();
});

// -------------------- Attach Handlers for Starting the Game --------------------
function attachStartHandlers() {
  // Remove previous event handlers to avoid duplicates
  $(window).off("keydown.startGame");
  $("#start-btn").off("click.startGame");
  $("#level-title").off("click.startGame");

  // Add handlers for keyboard, start button click and title click/tap
  $(window).on("keydown.startGame", startGame);
  $("#start-btn").on("click.startGame", startGame);
  $("#level-title").on("click.startGame", startGame);
}

// -------------------- Start Game Function --------------------
function startGame() {
  if (!started) {
    started = true;

    $(".container, #reset-score, #current-score").fadeIn();
    $("#start-btn").fadeOut();
    $("#high-score").hide();

    // Remove floating text effect on game start
    $("#level-title").removeClass("floating-text");

    // Remove start handlers as game is now running
    $(window).off("keydown.startGame");
    $("#start-btn").off("click.startGame");
    $("#level-title").off("click.startGame");

    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    nextSequence();
    $("#level-title").text("Level " + level);
  }
}

// -------------------- Sequence Generator --------------------
function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(300).fadeIn(300);
  setTimeout(() => makeSound(randomChosenColour), 350);

  level++;
  $("#level-title").text(`Level ${level}`);
  $("#current-score").text(`Current Score: ${level - 1}`);
}

// -------------------- User Interaction --------------------
$(".btn").click(function () {
  if (!started || userClickedPattern.length >= gamePattern.length) return;

  const userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// -------------------- Check User Answer --------------------
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// -------------------- Game Over Handler --------------------
function gameOver() {
  started = false;
  userClickedPattern = [];

  makeSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 300);

  $("#level-title")
    .text("Game Over, Press Any Key or Tap Here to Restart")
    .addClass("floating-text");

  startOver();
  attachRestartHandlers();
}

// -------------------- Attach Handlers for Restarting the Game --------------------
function attachRestartHandlers() {
  // Remove old restart event handlers
  $(window).off("keydown.restartGame");
  $("#level-title").off("click.restartGame");

  // Add restart event handlers on keyboard and clicking/tapping the title
  $(window).on("keydown.restartGame", startGame);
  $("#level-title").on("click.restartGame", startGame);
}

// -------------------- Reset Game State --------------------
function startOver() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);
    $("#high-score").text("Your Best Score: " + highScore);
  }

  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;

  $(".container, #reset-score, #current-score").fadeOut();
  $("#high-score").fadeIn();
}

// -------------------- Volume Control --------------------
$("#volumeRange").on("input", function () {
  currentVolume = parseFloat(this.value);
});

// -------------------- Sound Handler --------------------
function makeSound(color) {
  let sound;
  switch (color) {
    case "red": sound = new Audio("sounds/red.mp3"); break;
    case "blue": sound = new Audio("sounds/blue.mp3"); break;
    case "green": sound = new Audio("sounds/green.mp3"); break;
    case "yellow": sound = new Audio("sounds/yellow.mp3"); break;
    case "wrong": sound = new Audio("sounds/wrong.mp3"); break;
    default:
      console.log("Unknown color: " + color);
      return;
  }
  sound.volume = currentVolume;
  sound.play();
}

// -------------------- Button Animation --------------------
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// -------------------- Reset High Score --------------------
$("#reset-score").click(function () {
  if (confirm("Are you sure you want to reset the high score?")) {
    localStorage.removeItem("highScore");
    highScore = 0;
    $("#high-score").text("Your Best Score: " + highScore);
  }
});
