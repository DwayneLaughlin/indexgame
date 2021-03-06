// Grabs the canvas tag from html file
const canvas = document.querySelector("canvas");
// context - returns an object that gives details for drawing images and graphics on a canvas
const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;

// class - template for creating objects
// This class creates templates for players
class Player {
  // constructor - adds properties to empty object created by the class
  constructor() {
    // position in window
    this.position = {
      x: 100,
      y: 100,
    };
    // velocity is needed for gravity. adding positive numbers will make you go down along y axis
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 30;
    this.height = 30;
  }
  // draw = method
  // fillstyle = changes styling
  // firRect = creates rectanglt based on parameters of position on x and y axis as well as width and height of the rectangle
  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    // draws rectangle
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    // conditional checks to see if rectangle is on the bottom of canvas element. If it is not rectangle will fall. If it is rectanle will stop. This creates gravity i=for the canvas
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      // creates gravity for rectangle by updating it's position and increasing it's fall rate gradually in the animate function
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 400,
      y: 500,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    context.fillStyle = "green";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// 'new' keyword does 3 things
// 1. creates an empty object
// 2. sets the value of 'this' to be the new empty object
// 3. calls the constructor method
const player = new Player();
const platform = new Platform();

// Sets default for left/right keys to be not pressed. This will allow us to set constant rate of speed later when they are pressed
const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

// creates animation loop. requestAnimationFrame function takes callback that we want to loop
// clearRect removes pixels in rectangular area
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  //   player's position is fixed to 400 to stop the player from going too far to the side of the screen. THis helps with
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 50) {
    player.velocity.x = -5;
  } else {
     
    player.velocity.x = 0;
    // Conditionals that move the platforms/backgrounds in opposite direction of player as they hit the edges of their movement box. This creates visual movement of progressing through the level or backtracking through the level.
    if (keys.right.pressed) {
      platform.position.x -= 5;
    }

    if (keys.left.pressed) {
      platform.position.x += 5;
    }
  }
  platform.draw();

  //   conditional to check if players position (player.height + player.position.y) is higher than the top of the platform (platform.position.y). Also checks the right side of the player (player.position. + width) is greater than the platform. If all of this is true player should sit on platform and fall to bottom of canvas when not on platform
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  }
}

animate();

// event listener checking for certain keys being pressed. Switch cases set up for A, D, and W, respectively.
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      keys.left.pressed = true;
      console.log(keys.left.pressed);
      break;

    case "d":
      keys.right.pressed = true;
      console.log(keys.right.pressed);
      break;
    // jump is created by just decreasing the velocity
    case "w":
      console.log("up");
      player.velocity.y -= 20;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = false;

      break;

    case "d":
      keys.right.pressed = false;
      console.log(keys.left.pressed);

      break;
    // jump is created by just decreasing the velocity
    case "w":
      console.log("up");
      player.velocity.y = 0;
  }
});
