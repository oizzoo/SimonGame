var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var currentVolume = 0.3;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    makeSound(randomChosenColour);
    return randomChosenColour
}

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

    sound.volume = currentVolume; // <--- to jest kluczowe!
    sound.play();
}


$("#volumeRange").on("input", function () {
    currentVolume = parseFloat(this.value);
});
