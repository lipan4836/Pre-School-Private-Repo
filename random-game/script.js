console.log(`Вёрстка +10
- реализован интерфейс игры +5
- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
Игра завершается, когда открыты все карточки +10
По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`);

const pcIcons = document.querySelectorAll('.pc-icons');
const gameContainer = document.querySelector('.memory-container');
const cards = document.querySelectorAll('.memory-card');
const endGameMenu = document.querySelector('.tv__screen-lastmenu');
const scoreShow = document.querySelector('.win-score');
const resultsWindow = document.querySelector('.game-results');
const ulList = document.querySelector('ul');

const newGameBtn = document.querySelector('.win-btn');
const resultsBtn = document.querySelector('.results-btn');
const closeBtn = document.querySelector('.close-btn');

// audio effects
const clickSound = new Audio('assets/sound/click.mp3');
const matchSound = new Audio('assets/sound/dsbl-cards.mp3');
const endGameSound = new Audio('assets/sound/gameover.mp3');

// dark and light themes
const body = document.getElementById('body');
const dayTimeBtn = document.querySelector('.daytime-btn');
const dayTimeImg = document.querySelector('.daytime-img');
const themeElems = document.querySelectorAll('.theme');
let dayTime = 'day';

let gamesCounter = 0;

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
  
  let isMatch = firstCard.dataset.waifu === secondCard.dataset.waifu;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  matchSound.play();

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  openedCards = openedCards + 2;

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
    endGameSound.play();

    scoreShow.textContent = `${steps}`;

    endGameMenu.classList.add('gameover');

    resultsToStorage();
  }
}

function resultsToStorage() {
  let gameResult = steps;
  if (localStorage.getItem('gameResults') === null) localStorage.setItem('gameResults', JSON.stringify([]));

  let results = JSON.parse(localStorage.getItem('gameResults'));
  results.push(gameResult);

  if (results.length > 10) {
    let trimResults = results.slice(-10);
    localStorage.setItem('gameResults', JSON.stringify(trimResults));
  } else {
    localStorage.setItem('gameResults', JSON.stringify(results));
  }
}

function shuffleCards() {
  cards.forEach(card => {
    let randPos = Math.floor(Math.random() * 12);
    card.style.order = randPos;
  });
}

function resultsList() {
  resultsWindow.classList.add('gameover');
  let resultsToShow = JSON.parse(localStorage.getItem('gameResults'));
  resultsToShow.forEach((el) => {
    const resultItem = document.createElement('li');
    resultItem.textContent = el;
    ulList.appendChild(resultItem);
  });
}

function clearResultsLi() {
  const allLi = document.querySelectorAll('li');
  allLi.forEach((el) => el.remove());
}

function startNewGame () {
  steps = 0;
  openedCards = 0;
  lockBoard = false;
  hasCardFlipped = false;
  gamesCounter += 1;
  endGameMenu.classList.remove('gameover');
  resultsWindow.classList.remove('gameover')
  resetBoard();
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  clearResultsLi();
  shuffleCards();
}

function dayOrNight() {
  if (dayTime == 'day') {
    body.classList.add('night');
    dayTimeImg.src = 'assets/img/day.svg';
    themeElems.forEach((el) => {
      el.style.color = '#FBECB2'
    });
    dayTime = 'night';
    return dayTime;
  }

  if (dayTime == 'night') {
    body.classList.remove('night');
    dayTimeImg.src = 'assets/img/night.svg';
    themeElems.forEach((el) => {
      el.style.color = '#000'
    });
    dayTime = 'day';
    return dayTime;
  }
}

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});

newGameBtn.addEventListener('click', startNewGame);
resultsBtn.addEventListener('click', resultsList);
closeBtn.addEventListener('click', () => {
  resultsWindow.classList.remove('gameover');
  clearResultsLi();
});
dayTimeBtn.addEventListener('click', dayOrNight);