/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper_object.js":
/*!******************************!*\
  !*** ./src/helper_object.js ***!
  \******************************/
/***/ ((module) => {

eval("const symbols = [\"🍎\", \"🍌\", \"🍇\", \"🍉\", \"🍓\", \"🍒\", \"🥝\", \"🍍\"];\r\n\r\nconst classNames = {\r\n  card: \"card\",\r\n  hidden: \"hidden\",\r\n  matched: \"matched\",\r\n  winMessage: \"win-message\",\r\n  gameBoard: \"game-board\",\r\n};\r\n\r\nmodule.exports = { classNames, symbols };\r\n\n\n//# sourceURL=webpack://tshepo-mohlophehi-222-memory-game-in-vanilla-js-javascript/./src/helper_object.js?");

/***/ }),

/***/ "./src/memory_game.js":
/*!****************************!*\
  !*** ./src/memory_game.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { symbols, classNames } = __webpack_require__(/*! ./helper_object */ \"./src/helper_object.js\");\r\nlet totalCards = 0;\r\nlet isFirstClick = true;\r\n\r\nlet firstCard = null;\r\nlet secondCard = null;\r\nlet lockBoard = false;\r\nlet matches = 0;\r\n\r\nlet currentColumns = 4;\r\nlet currentRows = 4;\r\n\r\nfunction startGame(rows = 4, columns = 4) {\r\n  resetBoard();\r\n\r\n  currentRows = rows;\r\n  currentColumns = columns;\r\n\r\n  const newArray = [];\r\n  totalCards = (rows * columns) / 2;\r\n\r\n  for (let i = 0; i < totalCards; i++) {\r\n    newArray.push(symbols[i]);\r\n  }\r\n\r\n  let boardSymbols = shuffle(newArray.concat(newArray));\r\n\r\n  const gameBoard = document.getElementById(classNames.gameBoard);\r\n  gameBoard.innerHTML = \"\";\r\n\r\n  gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;\r\n  gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;\r\n\r\n  document.getElementById(\"reset-button\").style.display = \"none\";\r\n\r\n  boardSymbols.forEach((newArray) => {\r\n    const card = createCard(newArray);\r\n    gameBoard.appendChild(card);\r\n  });\r\n}\r\n\r\nfunction onCardClicked(event) {\r\n  if (lockBoard) return;\r\n\r\n  const clickedCard = event.target;\r\n\r\n  if (\r\n    clickedCard === firstCard ||\r\n    clickedCard.classList.contains(classNames.matched)\r\n  ) {\r\n    return;\r\n  }\r\n\r\n  clickedCard.classList.remove(classNames.hidden);\r\n  clickedCard.textContent = clickedCard.dataset.symbol;\r\n\r\n  if (isFirstClick) {\r\n    document.getElementById(\"reset-button\").style.display = \"block\";\r\n    isFirstClick = false;\r\n  }\r\n\r\n  if (!firstCard) {\r\n    firstCard = clickedCard;\r\n  } else {\r\n    secondCard = clickedCard;\r\n    checkForMatch(firstCard, secondCard);\r\n  }\r\n}\r\n\r\nfunction checkForMatch(card1, card2) {\r\n  if (card1.dataset.symbol === card2.dataset.symbol) {\r\n    matches += 1;\r\n    card1.classList.add(classNames.matched);\r\n    card2.classList.add(classNames.matched);\r\n    handleCardsMatch();\r\n  } else {\r\n    lockBoard = true;\r\n\r\n    setTimeout(() => {\r\n      card1.classList.add(classNames.hidden);\r\n      card2.classList.add(classNames.hidden);\r\n      card1.textContent = \"\";\r\n      card2.textContent = \"\";\r\n      handleCardsMatch();\r\n    }, 1000);\r\n  }\r\n}\r\n\r\nfunction handleCardsMatch() {\r\n  resetCards();\r\n  if (matches == totalCards) {\r\n    setTimeout(displayWinMessage, 500);\r\n    lockBoard = true;\r\n  }\r\n}\r\n\r\nfunction resetCards() {\r\n  [firstCard, secondCard] = [null, null];\r\n  lockBoard = false;\r\n}\r\n\r\nfunction resetBoard() {\r\n  firstCard = null;\r\n  secondCard = null;\r\n  lockBoard = false;\r\n  matches = 0;\r\n  isFirstClick = true;\r\n}\r\n\r\nfunction createCard(symbol) {\r\n  const card = document.createElement(\"div\");\r\n  card.classList.add(classNames.card, classNames.hidden);\r\n  card.dataset.symbol = symbol;\r\n  card.addEventListener(\"click\", onCardClicked);\r\n  return card;\r\n}\r\n\r\nfunction shuffle(array) {\r\n  return array.sort(() => Math.random() - 0.5);\r\n}\r\n\r\nfunction displayWinMessage() {\r\n  const winMessage = document.getElementById(\"winMessage\");\r\n  winMessage.textContent = \"********The Memory Champ Wins!***********\";\r\n  winMessage.classList.add(classNames.winMessage);\r\n}\r\n\r\nfunction reloadPage() {\r\n  const winMessage = document.getElementById(\"winMessage\");\r\n  if (winMessage) {\r\n    winMessage.textContent = \"\";\r\n  }\r\n  const gameBoard = document.getElementById(\"game-board\");\r\n  gameBoard.innerHTML = \"\";\r\n  startGame(currentRows, currentColumns);\r\n}\r\n\r\ndocument.getElementById(\"new-grid\").addEventListener(\"click\", () => {\r\n  const rows = parseInt(document.getElementById(\"rows\").value, 10);\r\n  const columns = parseInt(document.getElementById(\"columns\").value, 10);\r\n\r\n  if ((rows * columns) % 2 !== 0) {\r\n    alert(\"Please select an even number of cards!\");\r\n    return;\r\n  }\r\n\r\n  const winMessage = document.getElementById(\"winMessage\");\r\n  if (winMessage) {\r\n    winMessage.textContent = \"\";\r\n  }\r\n\r\n  startGame(rows, columns);\r\n});\r\n\r\ndocument.getElementById(\"reset\").addEventListener(\"click\", reloadPage);\r\nstartGame();\r\n\r\nmodule.exports = {\r\n  startGame,\r\n  displayWinMessage,\r\n  handleCardsMatch,\r\n  shuffle,\r\n  checkForMatch,\r\n};\r\n\n\n//# sourceURL=webpack://tshepo-mohlophehi-222-memory-game-in-vanilla-js-javascript/./src/memory_game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/memory_game.js");
/******/ 	
/******/ })()
;