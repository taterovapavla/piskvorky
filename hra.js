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
    circleElement.style.display = "block";
    crossElement.style.display = "none";
    currentPlayer = "cross";
  } else if (currentPlayer === "cross") {
    event.target.classList.add("game__field--cross");
    event.target.disabled = true;
    circleElement.style.display = "none";
    crossElement.style.display = "block";
    currentPlayer = "circle";
  }
};

const aiPlays = async (gameField) => {
  const fields = document.querySelectorAll(".game__field");
  fields.forEach((field) => {
    field.disabled = true;
  });
  const response = await fetch(
    "https://piskvorky.czechitas-podklady.cz/api/suggest-next-move",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        board: gameField,
        player: "x", // Hledá tah pro křížek.
      }),
    }
  );
  const data = await response.json();
  fields.forEach((field) => {
    if (
      field.classList.contains("game__field--circle") ||
      field.classList.contains("game__field--cross")
    ) {
      field.disabled = true;
    } else {
      field.disabled = false;
    }
  });
  const { x, y } = data.position; // x bude 0 a y bude 1, protože to je jediné volné políčko. x 0 odpovídá prvnímu sloupci a y 1 druhému řádku.
  const field = fields[x + y * 10]; // Najde políčko na příslušné pozici.
  field.click(); // Simuluje kliknutí. Spustí událost `click` na políčku.
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

  if (currentPlayer === "cross") {
    aiPlays(gameField);
  }

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
