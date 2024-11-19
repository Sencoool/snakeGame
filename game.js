const gameBoard = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

// Game variable
let gridSize = 20;
let snake = [{ x: 10, y: 10 }]; // Snake starting position
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200; // milliseconds
let gameStarted = false;
// console.log(gameBoard);

function draw() {
  gameBoard.innerHTML = "";
  drawSnake();
  drawFood();
}

// Snake

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    gameBoard.appendChild(snakeElement);
  });
}

// Snaketails

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// draw();

// Food

function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  gameBoard.appendChild(foodElement);
}

function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
  }

  snake.unshift(head); // adding new array of snake head pos x,y

  // snake.pop(); // remove recently array of snake head pos x,y

  // check food collision and generate new food

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval();
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop(); // if not collision with food then remove recently snake
  }
}

// Testing game moving
// setInterval(() => {
//   move(); // Move pos first
//   draw(); // Then draw at new pos
// }, 200);

function startGame() {
  gameStarted = true;
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    // checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Key press event listener
function handleKeyPress(e) {
  if (
    (!gameStarted && e.code === "Space") ||
    (!gameStarted && e.key === "  ")
  ) {
    startGame();
  } else {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);
