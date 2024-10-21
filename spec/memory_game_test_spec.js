const {
  displayWinMessage,
  startGame,
} = require("../src/memory_game.js");

const script = require("../src/memory_game.js");

const { classNames, symbols } = require("../src/helper_object.js");

describe("Memory Game", function () {
  let cards;
  beforeEach(() => {
    jasmine.clock().install();
    startGame();
    displayWinMessage();
    cards = document.querySelectorAll(".card");
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe("Shuffle Function", function () {
    it("should randomize the fruit symbols", function () {
      spyOn(script, "shuffle");
      const testFruitSymbols = symbols.concat(symbols);
      const shuffledFruits = script.shuffle(testFruitSymbols.slice());
      expect(script.shuffle).toHaveBeenCalledOnceWith(testFruitSymbols);
      expect(shuffledFruits).not.toEqual(testFruitSymbols);
    });
  });

  describe("Game Functionality", function () {
    it("should have hidden cards", function () {
      cards.forEach((card) => {
        expect(card.classList.contains(classNames.hidden)).toBe(true);
      });
    });

    it("should flip a card when it is clicked", function () {
      cards[0].click();
      expect(cards[0].classList.contains(classNames.hidden)).toBe(false);
    });

    it("should not trigger any additional actions when the same card is clicked multiple times", function () {
      spyOn(cards[0].classList, "remove").and.callThrough();
      cards[0].click();

      expect(cards[0].classList.remove).toHaveBeenCalledWith(classNames.hidden);
      expect(cards[0].classList.contains(classNames.hidden)).toBe(false);
      cards[0].click();
      cards[0].click();
      expect(cards[0].classList.remove).toHaveBeenCalledTimes(1);
      expect(cards[0].classList.contains(classNames.hidden)).toBe(false);
    });

    it("should not allow more than two cards to be flipped at the same time", function () {
      cards[0].dataset.symbol = symbols[0];
      cards[1].dataset.symbol = symbols[1];

      cards[0].click();
      cards[1].click();

      cards[2].click();
      expect(cards[0].classList.contains(classNames.hidden)).toBe(false);
      expect(cards[1].classList.contains(classNames.hidden)).toBe(false);

      expect(cards[2].classList.contains(classNames.hidden)).toBe(true);
    });

    it("should flip the two cards when they are not matching", function () {
      spyOn(cards[0].classList, "add").and.callThrough();
      spyOn(cards[2].classList, "add").and.callThrough();

      cards[0].dataset.symbol = symbols[0];
      cards[2].dataset.symbol = symbols[3];

      cards[0].click();
      cards[2].click();

      jasmine.clock().tick(1000);

      expect(cards[0].classList.add).toHaveBeenCalledWith(classNames.hidden);
      expect(cards[2].classList.add).toHaveBeenCalledWith(classNames.hidden);

      expect(cards[0].classList.contains(classNames.hidden)).toBe(true);
      expect(cards[2].classList.contains(classNames.hidden)).toBe(true);
    });

    it("should match cards with the fruit same symbol's", function () {
      spyOn(cards[0].classList, "add").and.callThrough();
      spyOn(cards[1].classList, "add").and.callThrough();

      cards[0].dataset.symbol = symbols[0];
      cards[1].dataset.symbol = symbols[0];

      cards[0].click();
      cards[1].click();
      jasmine.clock(1000);

      expect(cards[0].classList.add).toHaveBeenCalledWith(classNames.matched);
      expect(cards[1].classList.add).toHaveBeenCalledWith(classNames.matched);

      expect(cards[0].classList.contains(classNames.matched)).toBe(true);
      expect(cards[1].classList.contains(classNames.matched)).toBe(true);
    });

    it("should not allow, the cards to be flipped back once matched", function () {
      spyOn(cards[0].classList, "add").and.callThrough();
      spyOn(cards[1].classList, "add").and.callThrough();

      cards[0].dataset.symbol = symbols[0];
      cards[1].dataset.symbol = symbols[0];

      expect(cards[0].classList.contains(classNames.hidden)).toBe(true);
      expect(cards[1].classList.contains(classNames.hidden)).toBe(true);

      cards[0].click();
      cards[1].click();
      jasmine.clock(1000);

      expect(cards[0].classList.add).toHaveBeenCalledWith(classNames.matched);
      expect(cards[1].classList.add).toHaveBeenCalledWith(classNames.matched);

      cards[0].click();
      cards[1].click();

      expect(cards[0].classList.contains(classNames.hidden)).toBe(false);
      expect(cards[1].classList.contains(classNames.hidden)).toBe(false);
    });

    it("should display win message when all cards are matched", function () {
      const winMessage = document.querySelector(".win-message");
      spyOn(winMessage.classList, "add").and.callThrough();

      for (let i = 0; i < cards.length; i += 2) {
        cards[i].dataset.symbol = symbols[i / 2];
        cards[i + 1].dataset.symbol = symbols[i / 2];

        cards[i].click();
        cards[i + 1].click();
      }

      cards.forEach((card) => {
        expect(card.classList.contains(classNames.matched)).toBe(true);
      });

      jasmine.clock().tick(500);

      expect(winMessage.classList.add).toHaveBeenCalledWith(
        classNames.winMessage
      );

      expect(winMessage.textContent).toBe(
        "********The Memory Champ Wins!***********"
      );
    });
  });

  describe("Reload button", function () {
    let resetButton;
    beforeEach(() => {
      resetButton = document.getElementById("reset-button");
    });

    it("should reset the state of the game", function () {
      resetButton.click();

      cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        expect(card.classList.contains(classNames.hidden)).toBe(true);
        expect(card.classList.contains(classNames.matched)).toBe(false);
      });
      expect(cards.length).toBe(16);
    });

    it("should be hidden when the game starts", function () {
      expect(resetButton.style.display).toBe("none");
    });

    it("should be visible upon the first card click", function () {
      cards[0].click();
      jasmine.clock(1000);
      expect(resetButton.style.display).toBe("block");
    });
  });

  describe("Re-configurable grid size button", function () {
    let newGridButton, rowsInput, columnsInput;

    beforeEach(() => {
      global.alert = jasmine.createSpy("alert");

      newGridButton = document.getElementById("new-grid");
      rowsInput = document.getElementById("rows");
      columnsInput = document.getElementById("columns");
    });

    it("should create a 2x2 grid (4 cards) when the user passes 2 for a row and column", function () {
      rowsInput.value = 2;
      columnsInput.value = 2;

      newGridButton.click();

      const cards = document.querySelectorAll(".card");
      expect(cards.length).toBe(4);
    });

    it("should create a 3x2 grid (6 cards) when the user passes 3 for rows and 2 for columns", function () {
      rowsInput.value = 3;
      columnsInput.value = 2;

      newGridButton.click();

      const cards = document.querySelectorAll(".card");
      expect(cards.length).toBe(6);
    });

    it("should throw an alert with the correct string and not update the grid size when an odd grid size is passed", function () {
      rowsInput.value = 3;
      columnsInput.value = 3;

      newGridButton.click();

      const cards = document.querySelectorAll(".card");
      expect(cards.length).not.toBe(9);

      expect(alert).toHaveBeenCalledWith(
        "Please select an even number of cards!"
      );
    });
  });
});
