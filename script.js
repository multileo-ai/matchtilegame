let cards = document.querySelectorAll(".cards");
const scoreElement = document.getElementById("score");
const matchedElement = document.getElementById("matched");
const turnsElement = document.getElementById("turns");

const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

const container = document.querySelector(".container");
const txt1 = document.querySelector(".txt1");

let flippedCards = [];
let moves = 0;
let matchedCards = 0;
let score = 0;
let started = false;

const flip = (card) => {
  card.classList.toggle("flipped");

  if (card.classList.contains("flipped")) {
    console.log("Card flipped");
    card.style.transform = "rotateY(180deg)";
    card.querySelector(".front").style.transform = "rotateY(180deg)";
    card.querySelector(".back").style.transform = "rotateY(0deg)";
  } else {
    console.log("Card unflipped");
    card.style.transform = "rotateY(0deg)";
    card.querySelector(".front").style.transform = "rotateY(0deg)";
    card.querySelector(".back").style.transform = "rotateY(180deg)";
  }

  card.style.transition = "transform 0.6s";
};

const CheckWin = () => {
  if (matchedCards === 16) {
    cards.forEach((card) => {
      card.style.pointerEvents = "none"; // Disable further clicks
      card.style.opacity = "0.5"; // Optional: dim the cards
      card.style.backgroudColor = "green"; // Optional: change background color to indicate win
      txt1.textContent = "Congratulations! You've Won!";
      txt1.style.color = "green"; // Change text color to indicate win
      container.style.backgroundColor = "green"; // Change container background color
      container.style.opacity = "0.5"; // Optional: dim the container
      container.style.border = "4px solid green"; // Change border color to indicate win
    });
    // Optionally, you can reset the game or redirect to a different page
    // location.reload(); // Uncomment to reload the game
  }
};

let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const shuffleArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const gamesetup = () => {
  let selectedImages = shuffleArray(num).slice(0, 8);
  console.log(selectedImages);
  let imagePairs = [...selectedImages, ...selectedImages];
  imagePairs = shuffleArray(imagePairs);
  cards.forEach((card, index) => {
    let imgElement = card.querySelector(".back .image");
    imgElement.src = `imgs/${imagePairs[index]}.jpeg`;
  });
};

window.addEventListener("load", () => {
  gamesetup();
});

startButton.addEventListener("click", () => {
  console.log("Game started");
  txt1.textContent = "Click on the cards to match them";
  txt1.style.color = "black"; // Reset text color
  container.style.opacity = "1"; // Reset container opacity
  container.style.border = "4px solid black"; // Reset border color

  if (!started) {
    cards.forEach((card) => {
      card.style.pointerEvents = "auto";
      card.style.opacity = "1";
      card.addEventListener("click", () => {
        flip(card);
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          if (
            flippedCards[0].querySelector(".back").querySelector(".image")
              .src ===
              flippedCards[1].querySelector(".back").querySelector(".image")
                .src &&
            flippedCards[0].classList[1] === flippedCards[1].classList[1] &&
            flippedCards[0] !== flippedCards[1]
          ) {
            console.log("Match found!");
            flippedCards[0].classList.add("matched");
            flippedCards[1].classList.add("matched");
            flippedCards[0].style.pointerEvents = "none";
            flippedCards[1].style.pointerEvents = "none";
            matchedCards += 2;
            score += 50; // Increment score for a match
            flippedCards = [];
            CheckWin();
          } else {
            console.log("Not a match");
            setTimeout(() => {
              if (flippedCards[0].classList.contains("flipped")) {
                flip(flippedCards[0]);
              }
              if (flippedCards[1].classList.contains("flipped")) {
                flip(flippedCards[1]);
              }
              flippedCards = [];
            }, 500);
          }
          scoreElement.textContent = score;
          matchedElement.textContent = matchedCards / 2; // Update matched pairs
          moves += 2;
          turnsElement.textContent = moves;
        }
      });
    });
    started = true;
  }
});

stopButton.addEventListener("click", () => {
  stopGame();
});

const stopGame = () => {
  if (started) {
    console.log("Game stopped");
    started = false;
    cards.forEach((card) => {
      card.style.pointerEvents = "none"; // Disable further clicks
      card.style.opacity = "0.5"; // Optional: dim the cards
      container.style.backgroundColor = "gray";
      container.style.border = "4px solid gray";
    });
  }
};

resetButton.addEventListener("click", () => {
  gamesetup();
  stopGame();
  cards.forEach((card) => {
    card.style.pointerEvents = "auto";
    card.style.opacity = "1"; // Optional: dim the cards
    container.style.backgroundColor = "black";
    container.style.border = "4px solid black";
    if (card.classList.contains("flipped")) {
      flip(card); // Unflip the card
    }
    card.classList.remove("matched"); // Remove matched class
    card.classList.remove("flipped"); // Remove flipped class
    card.querySelector(".front").style.transform = "rotateY(0deg)";
    card.querySelector(".back").style.transform = "rotateY(180deg)";
    card.style.transform = "rotateY(0deg)";
  });
  started = false;
  flippedCards = [];
  txt1.textContent = "Click on the cards to match them";
  txt1.style.color = "black"; // Reset text color
  container.style.border = "4px solid black"; // Reset border color
  container.style.opacity = "1"; // Reset container opacity

  score = 0;
  matchedCards = 0;
  moves = 0;
  scoreElement.textContent = score;
  matchedElement.textContent = matchedCards / 2; // Reset matched pairs
  turnsElement.textContent = moves;
});
