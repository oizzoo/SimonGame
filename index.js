var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var currentVolume = 0.3;
var level = 0;
var started = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text(`Level ${level}`); 

    makeSound(randomChosenColour);
    return randomChosenColour
}

//detect when any of the buttons are clicked

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})


//create sound effect
function makeSound(color) {
    var sound;

    switch (color) {
        case "red":
            sound = new Audio("sounds/red.mp3");
            break;
        case "blue":
            sound = new Audio("sounds/blue.mp3");
            break;
        case "green":
            sound = new Audio("sounds/green.mp3");
            break;
        case "yellow":
            sound = new Audio("sounds/yellow.mp3");
            break;
        default:
            console.log("Nieznany kolor: " + color);
            return;
    }

    sound.volume = currentVolume;
    sound.play();
}


$("#volumeRange").on("input", function () {
    currentVolume = parseFloat(this.value);
});

// Animate clicked colours
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//Detect ONLY first key push

$(window).one("keydown", function() {
  if (!started) {
      started = true;
      nextSequence();
      $("#level-title").text("Level " + level);
  }
});

// checking answer

function checkAnswer(currentLevel) {
   
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
    } else {
       var wrongSound = new Audio("sounds/wrong.mp3");
       wrongSound.volume = currentVolume;
       wrongSound.play()

       $("body").addClass("game-over");

       setTimeout(function() {
         $("body").removeClass("game-over");
       }, 300);
    }

    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
            nextSequence()
            userClickedPattern = [];
        }, 1000);
    }

}

