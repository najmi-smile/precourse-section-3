var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
 
// direction variables

 var x = canvas.width/2;
 var y = canvas.height - 30;
 var dx = 2;
 var dy = -2;
 var ballRadious = 8;
 // paddle varriables
 var paddleHeight = 10;
 var paddleWidth = 75;
 var paddleX = (canvas.width - paddleWidth) / 2;
 // paddle movement dedection
 var rightPressed = false;
 var leftPressed = false;

// bricks environment
var brickRowCount = 3;
var brickColumnCount = 5;
var brickHeight = 20;
var brickWidth = 75;
var brickPadding = 5;
var brickOffsetTop = 5;
var brickOffsetLeft = 5

var bricks = [];
for(var c = 0; c<brickColumnCount; c++){
  bricks[c] = [];
  for(var r = 0; r<brickRowCount;r++){
    bricks[c][r] = {x:0, y:0, status:1};
  }
}
// score var to keep track of progress
var score = 0;

// listen to the keys to catch them
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks(){
  for(var c = 0; c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount;r++){
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX,brickY, brickWidth, brickHeight);
        ctx.fillstyle = 'green';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function brickCollisionDetector(){
  for(var c = 0;c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount; r++){
      
      if(bricks[c][r].status == 1){
        if((x > bricks[c][r].x && x < bricks[c][r].x + brickWidth) && (y > bricks[c][r].y && y < bricks[c][r].y + brickHeight)){
          dy = -dy;
          bricks[c][r].status = 0;
          score++;
          if(score == brickRowCount * brickColumnCount){
            alert("Youu WON! Congradulation");
            window.location.reload();
          }
        }
      }
    }
  }
}
function drawBall(){
   ctx.beginPath();
   ctx.arc(x,y,ballRadious,0,Math.PI*2,false);
   ctx.fillstyle = 'green';
   ctx.fill();
   ctx.closePath;
}
function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  } else if(e.keyCode == 37){
    leftPressed = true;
  }
}
function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  } else if(e.keyCode == 37){
    leftPressed = false;    
  }
}
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight,paddleWidth, paddleHeight);
  ctx.fillstyle = 'green';
  ctx.fill();
  ctx.closePath();
}
function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillstyle = "#0095DD";
  ctx.fillText("Score: "+ score, 8,90);
}

function playGame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();
  brickCollisionDetector();
  drawScore();
  if(y + dy < ballRadious){
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadious){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    } 
    else {
      alert("Game Over");
      window.location.reload();
    }
  }
  if((x + dx > canvas.width-ballRadious) || (x + dx < ballRadious)){
    dx = -dx;
  }
  if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
  } else if(leftPressed && paddleX > 0 ){
    paddleX -= 7;
  }

  x += dx;
  y += dy;

}
setInterval(playGame, 25);