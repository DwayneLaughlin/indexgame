// Grabs the canvas tag from html file
const canvas = document.querySelector('canvas');
// context - returns an object that gives details for drawing images and graphics on a canvas
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// class - template for creating objects
// This class creates templates for players
class Player {
    // constructor - adds properties to empty object created by the class
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30
        this.height = 30
    }
    // draw = method
    // fillstyle = changes styling
    // firRect = creates rectanglt based on parameters of position on x and y axis as well as width and height of the rectangle
    draw(){
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height )
    }
}

// 'new' keyword does 3 things
// 1. creates an empty object
// 2. sets the value of 'this' to be the new empty object
// 3. calls the constructor method
const player = new Player()
player.draw()
