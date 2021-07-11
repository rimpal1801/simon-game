

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started = false;
var level =0;

$(".btn").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
  if(started){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
 checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
      var audio = new Audio( "wrong" + ".mp3");
      audio.play();
      $("#level-title").text("Game Over, for new game click any button");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 800);
    startOver();
  }
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  level++;
  $("#level-title").text("level " + level);
gamePattern.push(randomChosenColour);

$("#"+ randomChosenColour )
.fadeOut(100)
.fadeIn(100)
.fadeOut(100)
.fadeIn(100);
playSound(randomChosenColour);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function playSound(name){
  var audio= new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");},100);
}
