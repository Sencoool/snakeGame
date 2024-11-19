const gameBoard = document.getElementById("game-board");

// Game variable
let snake = [{ x: 10, y: 10 }]; // Snake starting position

// console.log(gameBoard);

function draw() {
  gameBoard.innerHTML = "";
  drawSnake();
}

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    gameBoard.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.girdRow = position.y;
}

draw();
