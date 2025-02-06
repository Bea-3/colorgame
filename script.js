// select colors from predefinded set
const predefinedColors = [
  "#FF6F61", // Coral
  "#6B5B95", // Purple
  "#88B04B", // Olive Green
  "#F7CAC9", // Light Pink
  "#92A8D1", // Light Blue
  "#F2C77D", // Soft Yellow
];

// game setup
const colorBox = document.getElementById("colorBox");
const colorButtons = document.querySelectorAll(".color-button");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let targetColor;
let score = 0;

// generate random color

function getRandomColor() {
  return predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
}

// start game
function startGame() {
  // Generate a target color
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Generate 6 random colors (one must be the target)
  let colors = [targetColor];
  while (colors.length < 6) {
    let newColor = getRandomColor();
    if (!colors.includes(newColor)) colors.push(newColor);
  }

  // Shuffle colors
  colors.sort(() => Math.random() - 0.5);

  // Assign colors to buttons
  colorButtons.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
    button.onclick = () => checkGuess(colors[index]);
  });

  gameStatus.textContent = "Make a guess!";
}

function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.classList.remove("shake");
    score++;
    scoreDisplay.textContent = score;
  } else {
    gameStatus.textContent = "Wrong! Try again. ❌";
    gameStatus.classList.add("shake");
  }
}

newGameButton.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  startGame();
});

document.addEventListener("DOMContentLoaded", () => {
  // Start the game on page load
  startGame();
});
