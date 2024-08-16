var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
    //alert("key is pressed");    //checking if function is working or not
        started=true;
    }   
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
    userClickedPattern=[];
    level++;

    $("#level-title").text("Level "+ level);
    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    //alert(randomNumber);
    var randomChosenColor=buttonColors[randomNumber];
    //alert(randomChosenColor);
    gamePattern.push(randomChosenColor);
    //alert(gamePattern(randomNumber));
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    //var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    //audio.play();   
    playSound(randomChosenColor);

    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
            nextSequence();
           },1000);
        }
    }
    else{
        console.log("wrong");
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}





  
