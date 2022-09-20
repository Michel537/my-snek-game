class Game {
  constructor() {
    this.snake = new Snake();
    this.score = 0;
    this.lvl = 1;
  }

  start() {
    setInterval(() =>{
      this.snake.move();
      this.snake.directionsEventListnr();
  }, 600);

/*   setInterval(() =>{
      this.createObstacles();
  }, 3000); */
  }

  createFood() {
    const food = new Food();
    return food;
  }

  createObstacles() {
    const obst = new Obstacles();
    return obst;
  }

  removeElement(objectInstance) {
    if (this.isCollition(objectInstance)) {
      this.objectInstance.domElm.remove();
    }
  }

  isCollision(objectInstance) {
    if (
      this.snake.positionX < objectInstance.positionX + objectInstance.width &&
      this.snake.positionX + this.snake.width > objectInstance.positionX &&
      this.snake.positionY < objectInstance.positionY + objectInstance.heigth &&
      this.snake.heigth + this.snake.positionY > objectInstance.positionY
    ) {
      // Collision detected!
      console.log("we have a collision");
      return true;
    } else {
      return false;
    }
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

class Characters {
  constructor() {
    this.positionX;
    this.positionY;
    this.width = 0;
    this.heigth = 0;    
  }

  addDomElement(className) {
    const domElm = document.createElement("div");
    domElm.className = className;
    domElm.style.width = this.width + "vw";
    domElm.style.height = this.heigth + "vh";
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
    this.width = 1;
    this.heigth = 1;
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
    this.width = 1;
    this.height = 1;
    this.domElmnt = super.addDomElement("food");
  }
  
}

class Obstacles extends Characters {
  constructor() {
    super();
    this.positionX = Math.floor(Math.random() * 39);
    this.positionY = Math.floor(Math.random() * 39);
    this.width = 1;
    this.height = 1;
    this.domElmnt = super.addDomElement("obstacles");
  }
 
}

const game = new Game();
game.start();
