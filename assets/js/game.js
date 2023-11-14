
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 200;
//let json_data = require('assets\js\animaldefine.json');
const animalSpriteSheet = new Image();
animalSpriteSheet.src = 'images/fox.png';//'images/bunnyhop.png';
//const animalSpriteSheet = await loadImage('images/bunnyhop.png')
const Count = 1;
const Animals = []; 
let Time = 0.0;
let GlobalFrame = 0;

fetch('images/animaldefine.txt')
  .then(response => response.text())
  .then(data => {
    console.log(data); // This will log the text content

    // Now you can parse the text content as needed
    // For example, split it into lines
    const lines = data.split('\n');
    console.log(lines);

    // Your code to handle the text content goes here
  })
  .catch(error => console.error('Error loading text file:', error));

class Animal{
    constructor(){
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * 50);
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.frame = Math.random()*5;
        this.width = 64*2;
        this.height = 64*2;
        this.frameDelay = 5;
        this.movespeed = 3;
        this.animation = "walk";
        this.dir = "right";
        this.state = "walk"
        this.text = "Player";
        this.color = "white";
    }
    update(){
        if(GlobalFrame % this.frameDelay === 0){
            this.frame >= 7 ? this.frame = 0 : this.frame++;
        }

        this.movement();
    }


    movement(){
        if(this.dir == "right"){
            this.x = this.x+this.movespeed;
            if(this.x +this.width > CANVAS_WIDTH)this.dir="left";
        }else if(this.dir == "left"){
            this.x = this.x-this.movespeed;
            if(this.x < 0)this.dir="right";
        }
    }

    draw(){
        if(this.dir == "left"){
            this.mirrorImage(animalSpriteSheet, this.frame * this.spriteWidth, 2 * 32, this.spriteWidth,this.spriteHeight, this.x, this.y, this.width, this.height)
        }else
        ctx.drawImage(animalSpriteSheet, this.frame * this.spriteWidth, 2 * 32, this.spriteWidth,this.spriteHeight, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.imageSmoothingEnabled = false;
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width/2, this.y+64);
    }
    mirrorImage() {
        // Flip the image horizontally by changing the scale of the canvas context
        ctx.save();
        ctx.scale(-1, 1); // Flip horizontally
        ctx.drawImage(
            animalSpriteSheet,
            this.frame * this.spriteWidth,
            2 * 32,
            this.spriteWidth,
            this.spriteHeight,
            -this.x - this.width, // Adjust x-coordinate for mirroring
            this.y,
            this.width,
            this.height
        );
        ctx.restore();
    }


    
}

for(let i = 0; i < Count; i++){
    Animals.push(new Animal)
}


function animate(){
    Animals.forEach(element => {
        element.update();
        element.draw();
    });
}
Animals.sort(function(a,b){return a.y - b.y});
function mainLoop(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    animate();
    Time += 0.033;
    GlobalFrame+=1;
}

let intervalId = setInterval(mainLoop, 33);


