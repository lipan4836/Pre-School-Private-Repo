// inputs
const form = document.querySelector('.header__right');
const searchInput = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const searchResults = document.querySelector('.container');
const showMoreBtn = document.querySelector('.show-more-btn');
const apiKey = 'ai8aJK-efo0saOGfga1MIjYxIuEhNg7DrOiftfKK3bg';

let inputData = '';
let page = 1;

async function searchImage() {
  inputData = searchInput.value;
  if (inputData === '') {
    const randomQuery = ['car', 'anime', 'cosplay', 'drift', 'frontend', 'food', 'drink', 'space', 'japan', 'nature'];
    let rand = Math.floor(Math.random() * randomQuery.length);

    fetchQuery(randomQuery[rand]);
    console.log('random');
  } else {
    fetchQuery(inputData);
    console.log('inputData');
  }
}

async function fetchQuery(inputData) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log('data', data);

  const results = data.results;
  console.log('results', results);

  showImage(results);
}

function showImage(results) {
  if (page === 1) {
    searchResults.innerHTML = '';
  }

  results.map(result => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.regular;
    image.alt = result.alt_description;

    imageWrapper.appendChild(image);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = 'block';
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;

  searchImage();
});

showMoreBtn.addEventListener('click', e => {
  searchImage();
});