var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    makeSound(randomChosenColour);
    return randomChosenColour
}

function makeSound(color) {
    switch (color) {
        case "red":
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;
        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
        default:
            console.log("Nieznany kolor: " + color);
    }
}