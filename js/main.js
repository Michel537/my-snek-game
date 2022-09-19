class Game {
  constructor() {
    this.snake = new Snake();
    
  }

  start() {   
    
    this.snake.move();     
    
    this.gameOver();

  
    
    
    
  }

  gameOver() {

    if(this.snake.positionX >= 50 || this.snake.positionX <= 0){
        console.log("we are inside");
        return location.href = "gameover.html"        
    }else if(this.snake.positionY <= 0 || this.snake.positionY >= 50 ){
        console.log("we are inside");
        return location.href = "gameover.html"        
    }

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
        this.positionX -= this.width;
        this.domElm.style.left = this.positionX + "vw";
        console.log(this.positionX);
      }
      if (event.key === "ArrowRight") {
        this.positionX += this.width;
        this.domElm.style.left = this.positionX + "vw";
        console.log(this.positionX);
      }
      if (event.key === "ArrowUp") {
        this.positionY += this.height;
        this.domElm.style.bottom = this.positionY + "vh";
        console.log(this.positionY);
      }
      if (event.key === "ArrowDown") {
        this.positionY -= this.height;
        this.domElm.style.bottom = this.positionY + "vh";
        console.log(this.positionY);
      }
    });
  }
}

class Food {}

const game = new Game();
game.start();
