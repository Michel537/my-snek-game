class Game {
  constructor() {
    this.board = this.createBoard();    
    this.ufo = new Ufo();
    this.score = 0;
    this.lvl = 1;
    this.multiplayer = 1;    
    this.asteroids = [];    
    this.fuel = null;
    this.speed = 100 / this.lvl;
    this.dificulty = 5000 / this.lvl;
  }

  start() {
    console.log(this.score);
    this.fuel = this.createfuel();
    const obstacle = this.createasteroids();
    this.asteroids.push(obstacle);

   const movementInt =  setInterval(() => { 

      //Ufo movements      
      this.ufo.move();
      this.ufo.directionsEventListnr();

      //Collision
      let gameOver = this.gameOver();
      this.asteroids.forEach( element => {
        const collisionObst = this.detectCollision(element);  
        if(collisionObst){          
        location.href = "gameover.html";
        }      

      })

      //Game over
      if (gameOver) {        
        location.href = "gameover.html";
      }
      

      //fuel and score
      const collisonfuel = this.detectCollision(this.fuel);
      if(collisonfuel){
        this.score = this.score + (30 * this.multiplayer);
        console.log(this.score);
        this.removeElementofBoard(this.fuel);
        this.fuel = this.createfuel();
      }

     
     
    }, this.speed);


       //Creating objects

       const obstInterval = setInterval(() => {
          const obst = this.createasteroids();
          this.asteroids.push(obst);                
          
        }, 3000);

    

    
    
   


  }
 

  createBoard() {
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

  createfuel() {
    const fuel = new Fuel();
    return fuel;
  }

  createasteroids() {
    const obst = new Asteroid();
    return obst;
  }

  removeElementofBoard(fuel) {
    const elmentToRmv = fuel.domElmnt;    
    fuel = null;
    elmentToRmv.remove();
  }

  detectCollision(objectInstance) {
    if (
      this.ufo.positionX < objectInstance.positionX + objectInstance.width &&
      this.ufo.positionX + this.ufo.width > objectInstance.positionX &&
      this.ufo.positionY < objectInstance.positionY + objectInstance.height &&
      this.ufo.height + this.ufo.positionY > objectInstance.positionY
    ) {
      // Collision detected!
      return true;
    } else {
      return false;
    }
  }

  gameOver() {
    if (
      this.ufo.positionX <= 0 ||
      this.ufo.positionX + this.ufo.width >= 80
    ) {
      return true;
    } else if (
      this.ufo.positionY <= 0 ||
      this.ufo.positionY + this.ufo.height >= 80
    ) {
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
    domElm.style.width = this.width + "vh";
    domElm.style.height = this.height + "vh";
    domElm.style.bottom = this.positionY + "vh";
    domElm.style.left = this.positionX + "vw";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(domElm);
    return domElm;
  }
}

class Ufo extends Characters {
  constructor() {
    super();
    this.positionX = 40;
    this.positionY = 40;
    this.width = 3;
    this.height = 3;
    this.direction = "left";
    this.domElmnt = super.addDomElement("ufo");
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

class Fuel extends Characters {
  constructor() {
    super();
    this.positionX = Math.floor(Math.random() * 70) + 1;
    this.positionY = Math.floor(Math.random() * 70) + 1;
    this.width = 3;
    this.height = 3;
    this.domElmnt = super.addDomElement("fuel");
  }
}

class Asteroid extends Characters {
  constructor() {
    super();
    this.positionX = Math.floor(Math.random() * 70) + 5;
    this.positionY = Math.floor(Math.random() * 70) + 5;
    this.width = 3;
    this.height = 3;
    this.domElmnt = super.addDomElement("asteroids");
  }
}

const game = new Game();
game.start();
