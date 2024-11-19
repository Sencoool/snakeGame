const gameBoard = document.getElementById("game-board");

// Game variable
let gridSize = 20;
let snake = [{ x: 10, y: 10 }]; // Snake starting position
let food = generateFood();
let direction = "right";
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

draw();

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

  snake.pop(); // remove recently array of snake head pos x,y
}

setInterval(() => {
  move(); // Move pos first
  draw(); // Then draw at new pos
}, 200);
