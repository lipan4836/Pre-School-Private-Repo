const pcIcons = document.querySelectorAll('.pc-icons');
const gameContainer = document.querySelector('.memory-container');
const cards = document.querySelectorAll('.memory-card');
const endGameMenu = document.querySelector('.tv__screen-lastmenu');
const scoreShow = document.querySelector('.win-score');

const newGameBtn = document.querySelector('.win-btn');

// audio effects
const clickSound = new Audio('assets/sound/click.mp3');
const matchSound = new Audio('assets/sound/dsbl-cards.mp3');
const endGameSound = new Audio('assets/sound/gameover.mp3');

let gamesCounter = 0;
let localBoard = [];
let totalBoard = [];

pcIcons[1].addEventListener('click', startGame);

function startGame() {
  pcIcons.forEach(el => {
    el.classList.add('hide-icons');
  });

  gameContainer.classList.add('start-game');
  endGameMenu.classList.remove('gameover');

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
  }, 1000);
}

function resetBoard() {
  [hasCardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function gameOver() {
  if (openedCards === 20) {
    console.log('finish!!');

    endGameSound.play();

    scoreShow.textContent = `${steps}`;
    totalBoard = JSON.parse(localStorage.getItem('leaders'));
    console.log('totalBoard after JSON', totalBoard)

    totalBoard.push(steps);       // ------------ тут шляпа происходит
    if (totalBoard.length > 10) {
      let localTrim = totalBoard.shift();
      console.log('localBoard over 10');
      console.log('localBoard', localBoard);
    }

    endGameMenu.classList.add('gameover');
    
    console.log('totalBoard', totalBoard);
    localStorage.setItem('leaders', JSON.stringify(totalBoard));

    return totalBoard;
  }
}

function shuffleCards() {
  cards.forEach(card => {
    let randPos = Math.floor(Math.random() * 12);
    card.style.order = randPos;
  });
}

function reload() {
  location.reload();
}

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});

newGameBtn.addEventListener('click', reload);
// -----------------------------------------------------------------------------------------------