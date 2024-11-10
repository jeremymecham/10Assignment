//gets canvas id
const canvas = document.getElementById("canvas");

//sets canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//sets the canvas to a 2d canvas
const ctx = canvas.getContext("2d");

//creates new object and sets the image to rocket.webp
const rocket = new Image();
rocket.src = "images/rocket.webp";

//creates  rocketPos object with x and y properties 
let rocketPos = {
    x: window.innerWidth / 3,
    y: window.innerHeight - 300
};

let velocity = -2; //initial upward velocity
let isAnimating = false; //prevent multiple loops
let showMessage = true; //flag to show initial message press any key

//draw function clears canvas, creates the green rectangle, and draws the image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, window.innerHeight - 100, window.innerWidth, 100);
    ctx.drawImage(rocket, rocketPos.x, rocketPos.y);
    //if the showmessage variable is true, the initial text will be shown
    if (showMessage) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press any key to begin countdown", canvas.width / 2, canvas.height / 2);
    }
}

//update function updates the rocket moving upwards by multiplying the initial velocity by 1.01
function update() {
    rocketPos.y += velocity;
    velocity *= 1.02;
    //checks to see if rocket is off screen. If so, stop the movement
    if (rocketPos.y <= -265) {
        rocketPos.y = 0;
        cancelAnimationFrame(gameLoop);
        isAnimating = false;
    }
}

//rocketloop function will continuously go through the update and draw functions by calling itself recursively
function rocketLoop() {
    update();
    draw();
    requestAnimationFrame(rocketLoop);
}

//startcountdown take count and recursively call itself until count < 0
function startCountdown(count) {
    if (count >= 0) {
        draw(); 
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Launch in: ${count}`, canvas.width / 2, canvas.height / 2);
        setTimeout(() => startCountdown(count - 1), 1000); //nested function to recursively call itself
    } else {
        showMessage = false; //hide the initial message
        isAnimating = true; //sets to true to get prevent multiple loops
        rocketLoop();
    }
}

//when any key is pressed the function checks if there is already a loop. If not, start the loop
document.onkeydown = function(evnt) {
    if (!isAnimating) {
        showMessage = false; // Hide the initial message
        countdown = 10; // Reset the countdown
        startCountdown(countdown);
    }
};

//loads all the initial draw elements
document.body.onload = function() {
    draw();
};
