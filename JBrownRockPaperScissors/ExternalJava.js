// Get references to the HTML elements
const selectEl = document.querySelector('select');
const tableEl = document.querySelector('table');
const resetBtn = document.querySelector('button');

// Initialize game state variables
let userWins = 0;
let computerWins = 0;
let round = 0;

// Define the game logic
function playGame(userMove) {
  const moves = ['rock', 'paper', 'scissors'];
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  let outcome = '';
  let outcomeImageSrc = '';

  if (userMove === computerMove) {
    outcome = 'tie';
    outcomeImageSrc = 'tie.jfif';
  } else if (
    (userMove === 'rock' && computerMove === 'scissors') ||
    (userMove === 'paper' && computerMove === 'rock') ||
    (userMove === 'scissors' && computerMove === 'paper')
  ) {
    outcome = 'win';
    outcomeImageSrc = 'win.jfif';
    userWins++;
  } else {
    outcome = 'lose';
    outcomeImageSrc = 'lose.jfif';
    computerWins++;
  }

  round++;

  // Create a new row in the table with the game results
  const newRow = tableEl.insertRow();
  const userCell = newRow.insertCell();
  const userText = document.createTextNode(userMove);
  userCell.appendChild(userText);

  const userWinsCell = newRow.insertCell();
  const userWinsText = document.createTextNode(`${userWins} (${((userWins / round) * 100).toFixed(2)}%)`);
  userWinsCell.appendChild(userWinsText);

  const computerCell = newRow.insertCell();
  const computerText = document.createTextNode(computerMove);
  computerCell.appendChild(computerText);

  const computerWinsCell = newRow.insertCell();
  const computerWinsText = document.createTextNode(`${computerWins} (${((computerWins / round) * 100).toFixed(2)}%)`);
  computerWinsCell.appendChild(computerWinsText);

  const outcomeCell = newRow.insertCell();
  const outcomeImg = document.createElement('img');
  outcomeImg.src = outcomeImageSrc;
  outcomeImg.alt = outcome;
  outcomeCell.appendChild(outcomeImg);

  // Check if the game is over
  if (round >= 10) {
    alert('Game Over!');
    resetGame();
  }
}

// Define the reset game function
function resetGame() {
  userWins = 0;
  computerWins = 0;
  round = 0;

  // Remove all rows from the table
  while (tableEl.rows.length > 1) {
    tableEl.deleteRow(1);
  }
}

// Add event listener to the dropdown menu
selectEl.addEventListener('change', function() {
  playGame(this.value);
});

// Add event listener to the reset button
resetBtn.addEventListener('click', resetGame);
