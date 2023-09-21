// control buttons
const playBtn = document.querySelector('.fa-play');
const nextBtn = document.querySelector('.fa-forward-fast');
const prevBtn = document.querySelector('.fa-backward-fast');
const volUpBtn = document.querySelector('.fa-volume-high');
const volDownBtn = document.querySelector('.fa-volume-low');
const volSlider = document.querySelector('.volume-slider');

//timeline
const timeLine = document.querySelector('.duration');
const timeDigits = document.querySelector('.timeline-digits');
const trackLength = document.querySelector('.duration-digits');

// title and cover
let blockName = document.querySelector('.player__bottom-song');
let blockCover = document.querySelector('.song-img');

// visualization


let timer = 0; // timer for song

let isPlay = false; // flag for play/pause
let playNum = 0; // current song

// create audio element
let track = document.createElement('audio');

// playlist
const playList = [
  {
    path: 'assets/audio/1-kot.mp3',
    title: 'Валентин Дядька - Подментованный кот',
    cover: 'assets/img/1-kot.jpg',
  },
  {
    path: 'assets/audio/2-girl-from-osi.mp3',
    title: 'Пасадена - Девочка с ОСИ',
    cover: 'assets/img/2-girl-from-osi.jpg',
  },
  {
    path: 'assets/audio/3-muravey.mp3',
    title: 'Лучший Самый День - Муравей',
    cover: 'assets/img/3-muravey.jpg',
  },
  {
    path: 'assets/audio/4-marfa.mp3',
    title: 'Меджикул - О, Марфа!',
    cover: 'assets/img/4-marfa.jpg',
  },
];

function loadTrack(playNum) {
  clearInterval(timer);
  resetSlider();

  track.src = playList[playNum].path;
  blockName.innerHTML = playList[playNum].title;
  blockCover.src = playList[playNum].cover;

  track.load();
  timer = setInterval(timeSlider, 1000);
}

loadTrack(playNum);

// play / pause functions
function play() {
  context.state = 'running';
  track.play();
  isPlay = true;
  playBtn.classList.add('playing');
}

function pause() {
  context.state = 'suspended';
  track.pause();
  isPlay = false;
  playBtn.classList.remove('playing');
}

function playAudio() {
  // checkAudioCtx();
  console.log('состояние контекста PLAY', context.state);

  if (!isPlay) {
    play();
  } else {
    pause();
  }
}

function playNext() {
  playNum += 1;
  if (playNum > playList.length - 1) playNum = 0;
  loadTrack(playNum);
  context.state = 'running';
  play();
  console.log('состояние контекста NEXT', context.state);
}

function playPrev() {
  playNum -= 1;
  if (playNum < 0) playNum = playList.length - 1;
  loadTrack(playNum);
  context.state = 'running';
  play();
  console.log('состояние контекста PREV', context.state);
}

// changing time slider
function resetSlider() {
  timeLine.value = 0;
}

function timelineChange() {
  sliderPosition = track.duration * (timeLine.value / 100);
  track.currentTime = sliderPosition;
}

function timeSlider() {
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    timeLine.value = position;
  }
  if (track.ended) {
    playNext();
  }

  timeDigits.textContent = getTimeCodeFromNum(track.currentTime);
  trackLength.textContent = getTimeCodeFromNum(track.duration);
}

// changing volume
function volumeChange() {
  track.volume = volSlider.value / 100;
}

function volumeUp() {
  volSlider.value = +volSlider.value + 10;
  track.volume = volSlider.value / 100;
}

function volumeDown() {
  volSlider.value -= 10;
  track.volume = volSlider.value / 100;
}

// show current time of track
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  let hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) {
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

// visualization
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const context = new AudioContext();
const analyser = context.createAnalyser();
const source = context.createMediaElementSource(track);

const fbc_array = new Uint8Array(analyser.frequencyBinCount);

window.addEventListener('load', () => {
  source.connect(analyser);
  analyser.connect(context.destination);

  loop();
}, false);

function loop() {
  window.requestAnimationFrame(loop);
  analyser.getByteFrequencyData(fbc_array);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#000`;

  let barX, barWidth, barHeight, bars = 100;

  for (let i = 0; i < bars; i++) {
    barX = i * 3;
    barWidth = 2;
    barHeight = -(fbc_array[i] / 2);
    ctx.fillRect(barX, canvas.height, barWidth, barHeight);
  }
}

// function checkAudioCtx () {
//   if (context.state === 'running') {
//     context.suspend();
//   } else if (context.state === 'suspended') {
//     context.resume();
//   }
// }