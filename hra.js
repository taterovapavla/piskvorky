import { findWinner } from "https://unpkg.com/piskvorky@0.1.4";

let currentPlayer = "circle";

const circleElement = document.querySelector(".game__circle");
const crossElement = document.querySelector(".game__cross");

crossElement.style.display = "none";

const ButtonsElement = document.querySelectorAll(".game__field");

const changeClass = (event) => {
  if (currentPlayer === "circle") {
    event.target.classList.add("game__field--circle");
    event.target.disabled = true;
  } else {
    event.target.classList.add("game__field--cross");
    event.target.disabled = true;
  }
};

const changePlayer = () => {
  if (currentPlayer === "circle") {
    currentPlayer = "cross";
  } else {
    currentPlayer = "circle";
  }
};

const changeNextPlayer = () => {
  if (currentPlayer === "circle") {
    circleElement.style.display = "block";
    crossElement.style.display = "none";
  } else {
    circleElement.style.display = "none";
    crossElement.style.display = "block";
  }
};

const checkWinner = () => {
  const herniPole = [];
  ButtonsElement.forEach((button) => {
    if (button.classList.contains("game__field--circle")) {
      herniPole.push("o");
    } else if (button.classList.contains("game__field--cross")) {
      herniPole.push("x");
    } else {
      herniPole.push("_");
    }
  });

  const vitez = findWinner(herniPole);
  if (vitez === "o" || vitez === "x") {
    alert(`Vyhrál hráč se symbolem ${vitez}.`); // Vyhrál hráč se symbolem o.
    location.reload();
  }
};

ButtonsElement.forEach((button) => {
  button.addEventListener("click", changeClass);
  button.addEventListener("click", changePlayer);
  button.addEventListener("click", changeNextPlayer);
  button.addEventListener("click", checkWinner);
});
