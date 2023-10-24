import { findWinner } from "https://unpkg.com/piskvorky@0.1.4";

let currentPlayer = "circle";

const circleElement = document.querySelector(".game__circle");
const crossElement = document.querySelector(".game__cross");

crossElement.style.display = "none";

const ButtonsElement = document.querySelectorAll(".game__field");

const nextMove = (event) => {
  if (currentPlayer === "circle") {
    event.target.classList.add("game__field--circle");
    event.target.disabled = true;
    currentPlayer = "cross";
    circleElement.style.display = "block";
    crossElement.style.display = "none";
  } else if (currentPlayer === "cross") {
    event.target.classList.add("game__field--cross");
    event.target.disabled = true;
    currentPlayer = "circle";
    circleElement.style.display = "none";
    crossElement.style.display = "block";
  }
};

const fillGameField = () => {
  const gameField = [];
  ButtonsElement.forEach((button) => {
    if (button.classList.contains("game__field--circle")) {
      gameField.push("o");
    } else if (button.classList.contains("game__field--cross")) {
      gameField.push("x");
    } else {
      gameField.push("_");
    }
  });

  const vitez = findWinner(gameField);
  if (vitez === "o" || vitez === "x") {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${vitez}.`), // Vyhrál hráč se symbolem o.
        location.reload();
    }, 300);
  }
};

ButtonsElement.forEach((button) => {
  button.addEventListener("click", nextMove);
  button.addEventListener("click", fillGameField);
});
