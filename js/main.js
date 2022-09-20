class Game {
  constructor() {
    this.board = this.createBoard();
    this.snake = new Snake();
    this.score = 0;
    this.lvl = 1;
    this.obstacle = this.createObstacles();
    this.food = this.createFood();
    this.speed = 100 + this.lvl;
  }

  start() {
    console.log(this.board.offsetWidth);
    console.log(this.board.offsetHeight);
    setInterval(() => {
      
      this.snake.move();
      this.snake.directionsEventListnr();
      let gameOver = this.gameOver();
      const collisionObst = this.detectCollision(this.obstacle);
      const collisionFood = this.detectCollision(this.food);
      if (gameOver || collisionObst) {
        location.href = "gameover.html";
      } 
      if(collisionFood){
      this.removeElementofBoard(this.food);
      }
      
      
      
    }, this.speed);

   /*  setInterval(() => {
      this.createObstacles();
    }, 3000); */
  }

  createBoard(){
    const domElm = document.createElement("div");
    domElm.className = "board";
    domElm.id = "board";
    domElm.style.width = "80vw";
    domElm.style.height = "80vh";
    domElm.style.bottom = "0vh";
    domElm.style.left = "0vw";

    const parentElm = document.querySelector("body");
    parentElm.appendChild(domElm);
    return domElm;

  }

  createFood() {
    const food = new Food();
    return food;
  }

  createObstacles() {
    const obst = new Obstacles();
    return obst;
  }

  removeElementofBoard(objectInstance) {
    const elmentToRmv = objectInstance.domElmnt;
    elmentToRmv.remove();
  }

  detectCollision(objectInstance) {
    if (
      this.snake.positionX < objectInstance.positionX + objectInstance.width &&
      this.snake.positionX + this.snake.width > objectInstance.positionX &&
      this.snake.positionY < objectInstance.positionY + objectInstance.height &&
      this.snake.height + this.snake.positionY > objectInstance.positionY
    ) {
      // Collision detected!      
      return true;
    } else {
      return false;
    }
  }

  gameOver() {    

    if (this.snake.positionX <= 0 || this.snake.positionX >= 80) {
      return true;
    } else if (this.snake.positionY <= 0 || this.snake.positionY >= 80) {
      return true;
    } else {
      return false;
    }
  }
}

class Characters {
  constructor() {
    this.positionX;
    this.positionY;
    this.width = 0;
    this.height = 0;    
  }

  addDomElement(className) {
    const domElm = document.createElement("div");
    domElm.className = className;
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
    this.positionX = 20;
    this.positionY = 20;
    this.width = 2;
    this.height = 2;
    this.direction = "left";
    this.domElmnt = super.addDomElement("snake");
  }

  

  directionsEventListnr() {
    const movementEvnt = document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        this.direction = "down";
      } else if (event.key === "ArrowUp") {
        this.direction = "up";
      } else if (event.key === "ArrowLeft") {
        this.direction = "left";
      } else if (event.key === "ArrowRight") {
        this.direction = "right";
      } else {
        console.log("not a valid key");
      }
    });
    return movementEvnt;
  }

  move() {    
    if (this.direction === "left") {
      this.positionX -= this.width;
    } else if (this.direction === "right") {
      this.positionX += this.width;
    } else if (this.direction === "up") {
      this.positionY += this.width;
    } else if (this.direction === "down") {
      this.positionY -= this.width;
    }    
    this.domElmnt.style.left = this.positionX + "vw";
    this.domElmnt.style.bottom = this.positionY + "vh";
  }
}




class Food extends Characters {
  constructor() {
    super();
    this.positionX = Math.floor(Math.random() * 49);
    this.positionY = Math.floor(Math.random() * 49);
    this.width = 2;
    this.height = 2;
    this.domElmnt = super.addDomElement("food");
  }
  
}

class Obstacles extends Characters {
  constructor() {
    super();
    this.positionX = Math.floor(Math.random() * 39);
    this.positionY = Math.floor(Math.random() * 39);
    this.width = 3;
    this.height = 3;
    this.domElmnt = super.addDomElement("obstacles");
  }
 
}

const game = new Game();
game.start();
