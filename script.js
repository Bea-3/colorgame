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

// Hide the color after a second so the user can guess
function hideColorBox() {
  colorBox.style.backgroundColor = "#F4E1D2";
  colorBox.style.border = "2px dashed #ccc";
}

// Generate a target color from the array
function generateColors() {
  let colors = [targetColor];
  while (colors.length < 6) {
      let newColor = getRandomColor();
      if (!colors.includes(newColor)) colors.push(newColor);
  }
  return colors;
}

// shuffle the colors 
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start a new game round
function startNewRound() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  let colors = generateColors();
  colors = shuffleArray(colors);

  colorButtons.forEach((button, index) => {
      button.style.backgroundColor = colors[index];
      button.onclick = () => checkGuess(colors[index]);
  });

  gameStatus.textContent = "Remember this color!";
  
  setTimeout(() => {
      hideColorBox();
      gameStatus.textContent = "Make a guess!";
  }, 1000);
}

// check guess
function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
      gameStatus.textContent = "Correct! 🎉";
      gameStatus.classList.remove("shake");
      score++;
      scoreDisplay.textContent = score;
      
      setTimeout(() => {
          startNewRound();
      }, 1500);
  } else {
      gameStatus.textContent = "Wrong! Try again. ❌";
      gameStatus.classList.add("shake");
      
      // Start a new round with a new target color
      setTimeout(() => {
        startNewRound();
    }, 1500);
  }
}

// REset the game
newGameButton.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  startNewRound();
});

document.addEventListener("DOMContentLoaded", () => {
  // Start the game on page load
  startNewRound();
});
