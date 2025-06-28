// -------------------- Game Variables --------------------
let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let currentVolume = 0.3;
let level = 0;
let started = false;

// -------------------- Sequence Generator --------------------
function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate button
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // Play sound
    makeSound(randomChosenColour);

    // Update level text
    level++;
    $("#level-title").text(`Level ${level}`);
}

// -------------------- User Interaction --------------------
$(".btn").click(function () {
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// -------------------- Sound Handler --------------------
function makeSound(color) {
    let sound;

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
        case "wrong":
            sound = new Audio("sounds/wrong.mp3");
            break;
        default:
            console.log("Unknown color: " + color);
            return;
    }

    sound.volume = currentVolume;
    sound.play();
}

// -------------------- Volume Control --------------------
$("#volumeRange").on("input", function () {
    currentVolume = parseFloat(this.value);
});

// -------------------- Animation --------------------
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// -------------------- Keydown to Start --------------------
function attachKeydownHandler() {
    function handler() {
        if (!started) {
            started = true;
            nextSequence();
            $("#level-title").text("Level " + level);
            $(window).off("keydown", handler); // Remove after first press
        }
    }

    $(window).on("keydown", handler);
}

attachKeydownHandler(); // Initial call

// -------------------- Answer Checking --------------------
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // Correct input so far
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        // Wrong input
        makeSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// -------------------- Game Reset --------------------
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;

    attachKeydownHandler(); // Re-attach listener for restart
}
