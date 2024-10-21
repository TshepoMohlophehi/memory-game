const { symbols, classNames } = require("./helper_object");
let totalCards = 0;
let isFirstClick = true;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

let currentColumns = 4;
let currentRows = 4;

function startGame(rows = 4, columns = 4) {
  resetBoard();

  currentRows = rows;
  currentColumns = columns;

  const newArray = [];
  totalCards = (rows * columns) / 2;

  for (let i = 0; i < totalCards; i++) {
    newArray.push(symbols[i]);
  }

  let boardSymbols = shuffle(newArray.concat(newArray));

  const gameBoard = document.getElementById(classNames.gameBoard);
  gameBoard.innerHTML = "";

  gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  document.getElementById("reset-button").style.display = "none";

  boardSymbols.forEach((newArray) => {
    const card = createCard(newArray);
    gameBoard.appendChild(card);
  });
}

function onCardClicked(event) {
  if (lockBoard) return;

  const clickedCard = event.target;

  if (
    clickedCard === firstCard ||
    clickedCard.classList.contains(classNames.matched)
  ) {
    return;
  }

  clickedCard.classList.remove(classNames.hidden);
  clickedCard.textContent = clickedCard.dataset.symbol;

  if (isFirstClick) {
    document.getElementById("reset-button").style.display = "block";
    isFirstClick = false;
  }

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    checkForMatch(firstCard, secondCard);
  }
}

function checkForMatch(card1, card2) {
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matches += 1;
    card1.classList.add(classNames.matched);
    card2.classList.add(classNames.matched);
    handleCardsMatch();
  } else {
    lockBoard = true;

    setTimeout(() => {
      card1.classList.add(classNames.hidden);
      card2.classList.add(classNames.hidden);
      card1.textContent = "";
      card2.textContent = "";
      handleCardsMatch();
    }, 1000);
  }
}

function handleCardsMatch() {
  resetCards();
  if (matches == totalCards) {
    setTimeout(displayWinMessage, 500);
    lockBoard = true;
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matches = 0;
  isFirstClick = true;
}

function createCard(symbol) {
  const card = document.createElement("div");
  card.classList.add(classNames.card, classNames.hidden);
  card.dataset.symbol = symbol;
  card.addEventListener("click", onCardClicked);
  return card;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function displayWinMessage() {
  const winMessage = document.getElementById("winMessage");
  winMessage.textContent = "********The Memory Champ Wins!***********";
  winMessage.classList.add(classNames.winMessage);
}

function reloadPage() {
  const winMessage = document.getElementById("winMessage");
  if (winMessage) {
    winMessage.textContent = "";
  }
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  startGame(currentRows, currentColumns);
}

document.getElementById("new-grid").addEventListener("click", () => {
  const rows = parseInt(document.getElementById("rows").value, 10);
  const columns = parseInt(document.getElementById("columns").value, 10);

  if ((rows * columns) % 2 !== 0) {
    alert("Please select an even number of cards!");
    return;
  }

  const winMessage = document.getElementById("winMessage");
  if (winMessage) {
    winMessage.textContent = "";
  }

  startGame(rows, columns);
});

document.getElementById("reset").addEventListener("click", reloadPage);
startGame();

module.exports = {
  startGame,
  displayWinMessage,
  handleCardsMatch,
  shuffle,
  checkForMatch,
};
