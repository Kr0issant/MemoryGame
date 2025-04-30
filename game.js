var buttonColors = ["red", "blue", "green", "yellow"];
var flashDuration = 100;

var level = 0;
var lost = false;
var correctPattern = [];
var userTurns = 0;

$(".btn").click(clickHandler);
// start with 'Enter' key
$(document).on("keydown", function(event) {
    if (event.key === "Enter") {
        start();
    }});
// start with 'START' button press
$(".start-btn").on("click", start);

function start(event) {
    if (level === 0) { 
        $(".start-btn").toggle();
        setTimeout(nextSequence, 500);
    }
    else if (lost === true) {
        level = 0;
        lost = false;
        $(".start-btn").toggle();
        nextSequence();
    }
}

function nextSequence() {
    // update level to title
    level++;
    $("#level-title").text("Level " + level);
    userTurns = 0;

    // add random color to list
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    correctPattern.push(randomChosenColor);

    // color flash animation and sound
    $("#" + randomChosenColor).fadeOut(flashDuration).fadeIn(flashDuration);
    new Audio("sounds/" + randomChosenColor + ".mp3").play();
}

function clickHandler(event) {
    if (lost === false && level > 0) {
        var userChosenColor = event.target.getAttribute("id");
        userTurns++;

        new Audio("sounds/" + userChosenColor + ".mp3").play();

        // pressing animation
        $("#" + userChosenColor).addClass("pressed")
        setTimeout(function() { $("#" + userChosenColor).removeClass("pressed"); }, 100);

        checkAnswer(userChosenColor);
    }
}

function checkAnswer(choice) {
    if (choice === correctPattern[userTurns - 1]) {
        if (userTurns === level) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        lost = true;
        correctPattern = [];
        $("#level-title").text("Game Over. Press Enter to Restart");
        new Audio("sounds/wrong.mp3").play();

        // bring back start button
        $(".start-btn").toggle();
        $(".start-btn").text("RESTART");

        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over"); }, 100);
    }
}
