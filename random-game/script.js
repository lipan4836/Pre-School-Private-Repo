const pcIcons = document.querySelectorAll('.pc-icons');
const gameContainer = document.querySelector('.memory-container');
const cards = document.querySelectorAll('.memory-card');

// audio effects
const clickSound = new Audio('assets/sound/click.mp3');
const matchSound = new Audio('assets/sound/dsbl-cards.mp3');
const endGameSound = new Audio('assets/sound/gameover.mp3');

let gamesCounter = 0;
let leaderBoard = [];

pcIcons[1].addEventListener('click', startGame);

function startGame() {
  pcIcons.forEach(el => {
    el.classList.add('hide-icons');
  });

  gameContainer.classList.add('start-game');

  gamesCounter += 1;
}

// -------------------------------------- game -----------------------------------------------------

let hasCardFlipped = false;
let lockBoard = false;
let openedCards = 0;
let firstCard, secondCard;
let steps = 0;

function flipCard() {
  clickSound.play();

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
  steps += 1;
  console.log('steps', steps);
  
  let isMatch = firstCard.dataset.waifu === secondCard.dataset.waifu;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  matchSound.play();

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  openedCards = openedCards + 2;
  console.log('openedCards', openedCards);

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
  if (openedCards === 20) {
    console.log('finish!!');

    endGameSound.play();

    let totalBoard = JSON.parse(localStorage.getItem('leaders'));

    if (leaderBoard.length > 10) {                       // ------------------ работает неправильно
      totalBoard.shift();
      totalBoard.push(steps);
    } else {
      totalBoard.push(steps);
    }
    
    localStorage.setItem('leaders', JSON.stringify(totalBoard));
  }
}

(function shuffleCards() {
  cards.forEach(card => {
    let randPos = Math.floor(Math.random() * 12);
    card.style.order = randPos;
  });
})();

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});
// -----------------------------------------------------------------------------------------------