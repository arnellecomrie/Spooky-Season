
const mazeLayout = [
  "###########",
  "#S..#....E#",
  "#.#.#.##..#",
  "#.#...#...#",
  "#.###.#.#.#",
  "#...B...#.#",
  "###.#.#...#",
  "#G..#..B.G#",
  "###########"
];

const mazeElement = document.getElementById("maze");
const escapeResult = document.getElementById("escapeResult");
const restartButton = document.getElementById("restartEscape");

let player;
let ghosts;
let gameOver;

// CHANGE 1: Find the starting position and ghosts
function startEscapeGame() {
  player = { x: 1, y: 1 };
  ghosts = [
    { x: 1, y: 7 },
    { x: 9, y: 7 }
  ];

  gameOver = false;

  escapeResult.textContent = "Find the exit to escape!";
  renderMaze();
}

// CHANGE 2: Draw the maze and game characters
function renderMaze() {
  mazeElement.innerHTML = "";

  mazeElement.style.gridTemplateColumns =
    `repeat(${mazeLayout[0].length}, 30px)`;

  for (let y = 0; y < mazeLayout.length; y++) {
    for (let x = 0; x < mazeLayout[y].length; x++) {
      const cell = document.createElement("div");
      const tile = mazeLayout[y][x];

      cell.classList.add("maze-cell");

      if (tile === "#") {
        cell.classList.add("wall");
        cell.textContent = "🌲";
      } else if (player.x === x && player.y === y) {
        cell.classList.add("player");
        cell.textContent = "🧙‍♀️";
      } else if (ghosts.some(g => g.x === x && g.y === y)) {
        cell.classList.add("ghost");
        cell.textContent = "👻";
      } else if (tile === "B") {
        cell.classList.add("bomb");
        cell.textContent = "🎃";
      } else if (tile === "E") {
        cell.classList.add("exit");
        cell.textContent = "🚪";
      } else {
        cell.classList.add("path");
      }

      mazeElement.appendChild(cell);
    }
  }
}

// CHANGE 3: Check whether a position is safe
function isWalkable(x, y) {
  return (
    y >= 0 &&
    y < mazeLayout.length &&
    x >= 0 &&
    x < mazeLayout[y].length &&
    mazeLayout[y][x] !== "#"
  );
}

// CHANGE 4: Move the witch using the keyboard
function movePlayer(dx, dy) {
  if (gameOver) return;

  const newX = player.x + dx;
  const newY = player.y + dy;

  if (!isWalkable(newX, newY)) return;

  player.x = newX;
  player.y = newY;

  checkCollision();

  if (gameOver) {
    renderMaze();
    return;
  }

  moveGhosts();
  checkCollision();
  renderMaze();
}

// CHANGE 5: Make the ghosts chase the witch
function moveGhosts() {
  ghosts.forEach(ghost => {
    const options = [
      { x: ghost.x + 1, y: ghost.y },
      { x: ghost.x - 1, y: ghost.y },
      { x: ghost.x, y: ghost.y + 1 },
      { x: ghost.x, y: ghost.y - 1 }
    ].filter(pos => isWalkable(pos.x, pos.y));

    if (options.length === 0) return;

    // Usually move toward the witch, sometimes wander
    options.sort((a, b) => {
      const distanceA =
        Math.abs(a.x - player.x) + Math.abs(a.y - player.y);
      const distanceB =
        Math.abs(b.x - player.x) + Math.abs(b.y - player.y);

      return distanceA - distanceB;
    });

    const next =
      Math.random() < 0.7
        ? options[0]
        : options[Math.floor(Math.random() * options.length)];

    ghost.x = next.x;
    ghost.y = next.y;
  });
}

// CHANGE 6: Detect ghosts, pumpkin bombs, and the exit
function checkCollision() {
  if (ghosts.some(g => g.x === player.x && g.y === player.y)) {
    gameOver = true;
    escapeResult.textContent =
      "👻 A ghost caught you! Try escaping again!";
    return;
  }

  if (mazeLayout[player.y][player.x] === "B") {
    gameOver = true;
    escapeResult.textContent =
      "💥 BOOM! You hit a pumpkin bomb!";
    return;
  }

  if (mazeLayout[player.y][player.x] === "E") {
    gameOver = true;
    escapeResult.textContent =
      "🧙‍♀️✨ You escaped the haunted maze! You win!";
  }
}

// CHANGE 7: Arrow keys and WASD controls
document.addEventListener("keydown", function(event) {
  const key = event.key.toLowerCase();

  const directions = {
    arrowup: [0, -1],
    w: [0, -1],
    arrowdown: [0, 1],
    s: [0, 1],
    arrowleft: [-1, 0],
    a: [-1, 0],
    arrowright: [1, 0],
    d: [1, 0]
  };

  if (directions[key] && document.getElementById("escape").classList.contains("active")) {
    event.preventDefault();
    movePlayer(...directions[key]);
  }
});

// CHANGE 8: Restart the game
restartButton.addEventListener("click", startEscapeGame);

startEscapeGame();
