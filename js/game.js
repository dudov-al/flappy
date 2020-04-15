var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBot = new Image();
var score = 0;

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBot.src = "img/flappy_bird_pipeBottom.png";
var gap = 120;

//Создаие блоков
var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0,
};

//При нажатии на какую-либо кнопку

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 20;
  grav = grav - 2.27;
}

//Позиция птички
var xPos = 50;
var yPos = 150;
var grav = 1;
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBot, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height - pipeUp.height),
      });
    }

    if (cvs.width - pipe[i].x == 0) {
      pipe.shift({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height - pipeUp.height),
      });
    }
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)||
          yPos + bird.height >= cvs.height - fg.height) 
    ) { throw(location.reload(true)); //Перезапуск страницы
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;
  grav = grav + 0.074;

  ctx.fillStyle = "#000";
  ctx.backgroundStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Счет: " + score, 100, cvs.height - 40);
  requestAnimationFrame(draw);
}

pipeBot.onload = draw();
