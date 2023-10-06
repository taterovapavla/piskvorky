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

ButtonsElement.forEach((button) => {
  button.addEventListener("click", changeClass);
  button.addEventListener("click", changePlayer);
  button.addEventListener("click", changeNextPlayer);
});
