const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');

// Game objects
const paddle = {
    width: 10,
    height: 80,
    speed: 6
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,
    speedY: 5,
    maxSpeed: 7
};

const player = {
    x: 20,
    y: canvas.height / 2 - paddle.height / 2,
    ...paddle
};

const computer = {
    x: canvas.width - 30,
    y: canvas.height / 2 - paddle.height / 2,
    ...paddle
};

let playerScore = 0;
let computerScore = 0;
const keys = {};

// Event listeners
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    player.y = mouseY - player.height / 2;
    
    // Clamp player paddle to canvas
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
});

// Update player position with arrow keys
function updatePlayerPosition() {
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

// Update computer AI
function updateComputerPosition() {
    const computerCenter = computer.y + computer.height / 2;
    const difficulty = 0.08;
    
    if (computerCenter < ball.y - 35) {
        computer.y += computer.speed * difficulty;
    } else if (computerCenter > ball.y + 35) {
        computer.y -= computer.speed * difficulty;
    }
    
    // Clamp computer paddle to canvas
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

// Draw functions
function drawPaddle(paddleObj) {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(paddleObj.x, paddleObj.y, paddleObj.width, paddleObj.height);
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddleObj.x, paddleObj.y, paddleObj.width, paddleObj.height);
}

function drawBall() {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawNet() {
    ctx.strokeStyle = '#667eea';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawCourt() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Collision detection
function checkPaddleCollision(paddleObj) {
    if (
        ball.x - ball.radius < paddleObj.x + paddleObj.width &&
        ball.x + ball.radius > paddleObj.x &&
        ball.y - ball.radius < paddleObj.y + paddleObj.height &&
        ball.y + ball.radius > paddleObj.y
    ) {
        // Reverse ball direction
        ball.speedX = -ball.speedX;
        
        // Add spin based on where ball hits the paddle
        const collidePoint = (ball.y - (paddleObj.y + paddleObj.height / 2)) / (paddleObj.height / 2);
        ball.speedY = collidePoint * ball.maxSpeed;
        
        // Increase speed slightly for more challenge
        const currentSpeed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
        if (currentSpeed < 8) {
            ball.speedX *= 1.05;
            ball.speedY *= 1.05;
        }
    }
}

// Wall collision
function checkWallCollision() {
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.speedY = -ball.speedY;
        
        // Clamp ball to canvas
        if (ball.y - ball.radius <= 0) ball.y = ball.radius;
        if (ball.y + ball.radius >= canvas.height) ball.y = canvas.height - ball.radius;
    }
}

// Score point
function checkScoring() {
    if (ball.x - ball.radius <= 0) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        resetBall();
    }
    if (ball.x + ball.radius >= canvas.width) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        resetBall();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.speedY = (Math.random() - 0.5) * 5;
}

// Update ball position
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

// Main game loop
function gameLoop() {
    drawCourt();
    drawNet();
    
    updatePlayerPosition();
    updateComputerPosition();
    updateBall();
    
    checkWallCollision();
    checkPaddleCollision(player);
    checkPaddleCollision(computer);
    checkScoring();
    
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();
    
    ctx.shadowColor = 'transparent';
    
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();