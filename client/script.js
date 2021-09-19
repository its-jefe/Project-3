const canvas = document.getElementById("mycanvas");
console.log("height: " + canvas.height, "width: " + canvas.width);

const ctx = canvas.getContext('2d');
console.log(ctx)

class player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update1() {
    ctx.beginPath();
    ctx.arc(this.x + deltaX, this.y + deltaY, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

var deltaX = 0;
var deltaY = 0;

speed = 1;
var x = 0;

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  switch (event.code) {
    case "ArrowDown":
      x = -1;
      setTimeout(function () {
        x = 0;
        var moveDown = setInterval(function () {
          if (x == -1) {
            clearInterval(moveDown)
          } else {
            deltaY += speed;
            // put this in a function later
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            player1.update1();
          }
        }, 20)
      }, 20)
      break;

    case "ArrowUp":
      x = -1;
      setTimeout(function () {
        x = 0;
        var moveUp = setInterval(function () {
          if (x == -1) {
            clearInterval(moveUp)
          } else {
            deltaY -= speed;
            // put this in a function later
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            player1.update1();
          }
        }, 20)
      }, 20)
      break;
    case "ArrowLeft":
 x = -1;
      setTimeout(function () {
        x = 0;
        var moveLeft = setInterval(function () {
          if (x == -1) {
            clearInterval(moveLeft)
          } else {
            deltaX -= speed;
            // put this in a function later
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            player1.update1();
          }
        }, 20)
      }, 20)
      break;
    case "ArrowRight":
            x = -1;
      setTimeout(function () {
        x = 0;
        var moveRight = setInterval(function () {
          if (x == -1) {
            clearInterval(moveRight)
          } else {
            deltaX += speed;
            // put this in a function later
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            player1.update1();
          }
        }, 20)
      }, 20)
      break;
  }

  player1.update1();

  // Consume the event so it doesn't get handled twice
  event.preventDefault();
}, true);

ratio = (canvas.height + canvas.width) / 50;

centerHeight = canvas.height / 2;
centerWidth = canvas.width / 2;

const player1 = new player(centerWidth, centerHeight, ratio, 'red');

player1.draw();