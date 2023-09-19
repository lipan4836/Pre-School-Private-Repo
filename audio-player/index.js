// control buttons
const playBtn = document.querySelector('.fa-play');
const nextBtn = document.querySelector('.fa-forward-fast');
const prevBtn = document.querySelector('.fa-backward-fast');
const volUpBtn = document.querySelector('.fa-volume-high');
const volDownBtn = document.querySelector('.fa-volume-low');

//timeline
const timeLine = document.querySelector('.timer__bg::before');
const timeDigits = document.querySelector('.timeline-digits');

// song and author
const songName = document.querySelector('.player__bottom-song');

// cover
const cover = document.querySelector('.player__top-cover');

//playlist and covers
// задумка положить mp3, названия, обложки в один массив объектов
// и доставать по номеру элемента массива

let isPlay = false; // flag for play/pause
let playNum = 0; // current song

const audio = new Audio();

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum];
    audio.currentTime = 0;
    audio.play();
    playBtn.classList.add('playing');
    isPlay = true;
  } else {
    audio.pause();
    playBtn.classList.remove('playing');
    isPlay = false;
  }
}

function playNext() {
  playNum += 1;
  if (playNum > playList.length) playNum = 0;
  playAudio();
}

function playPrev() {
  playNum -= 1;
  if (playNum < 0) playNum = playList.length;
  playAudio();
}

// playBtn.addEventListener('click', toggleBtn);