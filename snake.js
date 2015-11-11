/*
 * TODO:
 *    jobb hit detection
 *    stílus
 *    szebb/rendezetteb kód
 *    gombok
 */



(function(){

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var lastKey = [];
document.addEventListener("keydown", function(event) {
  lastKey.push(event.keyCode);
}, true);


canvas.width = 600;
canvas.height = 600;

var x = 250;
var y = 250;
var speed = 5;
var fel = true;
var le = false;
var jobb = false;
var bal = false;
var posArr = [];
var food = new Food(new Pos(250, 100));



function Pos (x, y) {
  this.x = x;
  this.y = y;
};


function Food (Pos) {
  this.x = Pos.x;
  this.y = Pos.y;
};


function drawFood() {
  ctx.fillStyle = "#fdd835";
  ctx.fillRect(food.x, food.y, 7, 7);
  ctx.fill();
};


function drawSnake () {
    ctx.fillStyle = "#e53935";
  for (var i = 0; i <= posArr.length - 1; i++) {
    ctx.fillRect(posArr[i].x, posArr[i].y, 13, 13);
    ctx.fill();
  };
};

function snakeAdd () {
  posArr.push(new Pos(posArr[posArr.length - 1].x, posArr[posArr.length - 1].y + 0.01));
  posArr.push(new Pos(posArr[posArr.length - 1].x, posArr[posArr.length - 1].y + 0.02));
  posArr.push(new Pos(posArr[posArr.length - 1].x, posArr[posArr.length - 1].y + 0.03));
  
  snakeLen += 3;
}

function snakeCol() {
  if (posArr[posArr.length - 1].x >= canvas.width || posArr[posArr.length - 1].x <=0) {
    return true;
  }

  if (posArr[posArr.length - 1].y >= canvas.height || posArr[posArr.length - 1].y <=0) {
    return true;
  }

  for (var i = 1; i <= posArr.length - 1; i++) {
    if (posArr[0].x == posArr[i].x &&
        posArr[0].y == posArr[i].y) {
      return true;
    }
  };
}



function gameOver () {
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "100px Sans";
  ctx.fillText("Game Over", 10, 300);
}


Food.prototype.eaten = function() {
  if (posArr[posArr.length - 1].x - 13 <= this.x && posArr[posArr.length - 1].x + 13 >= this.x &&
      posArr[posArr.length - 1].y - 13 <= this.y && posArr[posArr.length - 1].y + 13 >= this.y) {

    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);

    if (this.x < 20) {this.x += 20}
    if (this.y < 20) {this.y += 20}

    if (this.x > canvas.width - 20) {this.x -= 20}
    if (this.y > canvas.height - 20) {this.y -= 20}
    snakeAdd();
  }
}

posArr.push(new Pos(250, 250));
posArr.push(new Pos(250, 255));
posArr.push(new Pos(250, 260));
posArr.push(new Pos(250, 265));
posArr.push(new Pos(250, 270));
posArr.push(new Pos(250, 275));
posArr.push(new Pos(250, 280));
posArr.push(new Pos(250, 285));
posArr.push(new Pos(250, 290));
posArr.reverse();

var snakeLen = posArr.length;


//animáció
  var lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      if (!snakeCol()) {
        loop();
      } else {
        gameOver();
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);


  function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (lastKey[lastKey.length - 1] == 87 && !le) {
      fel = true;
      le = false;
      jobb = false;
      bal = false;
    }
    if (lastKey[lastKey.length - 1] == 83 && !fel) {
      le = true;
      fel = false;
      jobb = false;
      bal = false;
    }
    if (lastKey[lastKey.length - 1] == 65 && !jobb) {
      bal = true;
      fel = false;
      le = false;
      jobb = false;
    }
    if (lastKey[lastKey.length - 1] == 68 && !bal) {
      jobb = true;
      fel = false;
      le = false;
      bal = false;
    }
  

    //csak az aktuális pozízio tároljuk
    while (posArr.length > snakeLen) {
      posArr.shift();
    }


    // új pozíció = előző pozíció + sebesség
    if (fel) {
      posArr.push(new Pos(posArr[posArr.length - 1].x, posArr[posArr.length - 1].y - speed));
    } else if (le) {
      posArr.push(new Pos(posArr[posArr.length - 1].x, posArr[posArr.length - 1].y + speed));
    } else if (jobb) {
      posArr.push(new Pos(posArr[posArr.length - 1].x + speed, posArr[posArr.length - 1].y));
    } else if (bal) {
      posArr.push(new Pos(posArr[posArr.length - 1].x - speed, posArr[posArr.length - 1].y));
    }

    food.eaten();
    drawFood();
    drawSnake();

  }
}());