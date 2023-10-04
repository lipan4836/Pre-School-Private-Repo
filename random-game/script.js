const pcIcons = document.querySelectorAll('.pc-icons');
const gameContainer = document.querySelector('.memory-container');
const cards = document.querySelectorAll('.memory-card');

pcIcons[1].addEventListener('click', startGame);

function startGame() {
  pcIcons.forEach(el => {
    el.classList.add('hide-icons');
  });

  gameContainer.classList.add('start-game');
}

// -------------------------------------- game -----------------------------------------------------

let hasCardFlipped = false;
let lockBoard = false;
let openedCards = 0;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasCardFlipped) {
    // first click
    hasCardFlipped = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkingMatch();
}

function checkingMatch() {
  let isMatch = firstCard.dataset.waifu === secondCard.dataset.waifu;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  openedCards = openedCards + 2;
  console.log('openedCards', openedCards);                        // -----------------------------------

  resetBoard();
  gameOver();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasCardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function gameOver() {
  if (openedCards === 20) console.log('finish!!')
}

(function shuffleCards() {
  cards.forEach(card => {
    let randPos = Math.floor(Math.random() * 12);
    card.style.order = randPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
// -----------------------------------------------------------------------------------------------