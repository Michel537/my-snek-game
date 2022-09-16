class Game{
    constructor(){

    }

    start(){
        const snake = new Snake();
        console.log(snake);
    }
}

class Snake{
    constructor(){
        this.positionX = 50;
        this.positionY = 50;
        this.width = 5;
        this.height = 5;
        this.domElm = this.createDomElmnt();
    }

    createDomElmnt(){
        const domElm = document.createElement("div");
        domElm.id = "snake";        
        domElm.style.width = this.width + "vw";
        domElm.style.height = this.height + "vh";
        domElm.style.bottom = this.positionX + "vw";
        domElm.style.left = this.positionY + "vh"

        const parentElm = document.getElementById("board");
        parentElm.appendChild(domElm);

    }
}

const game = new Game();
game.start();