var buttonColours = ["red", "blue", "green", "yellow"] //Where nextSequence() will randomly select a color.
var gamePattern = []; //The randomly selected colors will be stored here.
var userClickedPattern = []; //The user's pattern will be stored here.
var started = false; //Will be set to true once the game has started and false if the game is over.
var level = 0; //Will be incremented every time nextSequence() is called.

$(document).keypress(function(event){
    //If a button is pressed, display the level in the "level-title" h1, call the nextSequence() and set the "started" to true
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    //Empty userClickedPattern, increment level and show current level
    userClickedPattern = []; 
    level++;
    $("#level-title").text("Level " + level);

    //Generate random number and use it as an index for buttonColours to randomly select a color.
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); //Store the selected color to gamePattern.

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Animation every time a random color is selected.

    playSound(randomChosenColour); //Call playSound() function to play a sound for a specific color
}

$(".btn").click(function (){
    //Get color from button id and store in userClickedPattern
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //Play color sound and use animation
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Get the last index userClickedPattern to check pattern
    checkAnswer((userClickedPattern.length - 1));
})

function checkAnswer(currentLevel){
    //If the current index (button clicked) of userClickedPattern is equal to gamePattern, "SUCCESS"
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //If userClickedPattern and gamePattern have equal length
        if(userClickedPattern.length === gamePattern.length){
            //Delay for 1000 then run the nextSequence() again.
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }

    }else{
        console.log("wrong");
        playSound("wrong") //Play wrong.mp3

        //Add game-over class and remove after 200ms
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
 
        $("#level-title").text("Game Over, Press Any Key to Restart"); //Change H1 text
        startOver(); //Restart game
    }
}

function startOver(){
    //Reset values
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3"); //Play sound from the "sounds" folder
    audio.play();
}

function animatePress(currentColour){
    //After a button is clicked, add the "pressed" class and remove it after 100ms
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
