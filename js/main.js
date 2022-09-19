class Game {
  constructor() {
    this.snake = new Snake();
  }

  start() {
    this.snake.move();
  }
}

class Characters {
  constructor() {
    this.positionX;
    this.positionY;
    this.width;
    this.height;
  }

  createDomElmnt(classElement) {
    const domElm = document.createElement("div");
    domElm.className = classElement;
    domElm.style.width = this.width + "vw";
    domElm.style.height = this.height + "vh";
    domElm.style.bottom = this.positionY + "vh";
    domElm.style.left = this.positionX + "vw";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(domElm);
    return domElm;
  }
}

class Snake extends Characters {
  constructor() {
    super();
    this.positionX = 25;
    this.positionY = 25;
    this.width = 2;
    this.height = 2;
    this.domElm = this.createDomElmnt();
  }

  createDomElmnt() {
    return super.createDomElmnt("snake");
  }

  moveOnDirection(direction) {}
  move() {
    const moveEvnt = document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        //to check movement on Y axis
        const initialY = this.positionY;
        this.positionX -= this.width;
        this.domElm.style.left = this.positionX + "vw";

        const myInterval = setInterval(() => {
          if (initialY !== this.positionY) {
            clearInterval(myInterval);
          } else {
            if (this.gameOver()) {
              location.href = "gameover.html";
            } else {
              console.log(event.key);
              this.positionX -= this.width;
              this.domElm.style.left = this.positionX + "vw";
            }
          }
        }, 200);
      }

      if (event.key === "ArrowRight") {
        //to check movement on Y axis
        const initialY = this.positionY;
        this.positionX += this.width;
        this.domElm.style.left = this.positionX + "vw";

        const myInterval = setInterval(() => {
          if (initialY !== this.positionY) {
            clearInterval(myInterval);
          } else {
            if (this.gameOver()) {
              location.href = "gameover.html";
            } else {
              this.positionX += this.width;
              this.domElm.style.left = this.positionX + "vw";
            }
          }
        }, 200);
      }

      if (event.key === "ArrowUp") {
        //to check movement on Y axis
        const initialX = this.positionX;
        this.positionY += this.height;
        this.domElm.style.bottom = this.positionY + "vh";

        const myInterval = setInterval(() => {
          if (initialX !== this.positionX) {
            clearInterval(myInterval);
          } else {
            if (this.gameOver()) {
              location.href = "gameover.html";
            } else {
              this.positionY += this.height;
              this.domElm.style.bottom = this.positionY + "vh";
            }
          }
        }, 200);
      }

      if (event.key === "ArrowDown") {
        //to check movement on Y axis
        const initialX = this.positionX;
        this.positionY -= this.height;
        this.domElm.style.bottom = this.positionY + "vh";

        const myInterval = setInterval(() => {
          if (initialX !== this.positionX) {
            clearInterval(myInterval);
          } else {
            if (this.gameOver()) {
              location.href = "gameover.html";
            } else {
              this.positionY -= this.height;
              this.domElm.style.bottom = this.positionY + "vh";
            }
          }
        }, 200);
      }
    });
  }

  gameOver() {
    if (this.positionX <= 0 || this.positionX >= 50) {
      return true;
    } else if (this.positionY <= 0 || this.positionY >= 49) {
      return true;
    } else {
      return false;
    }
  }
}

class Food {}

const game = new Game();
game.start();
