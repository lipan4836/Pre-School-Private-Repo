// get hided api key for unslpash
import './env.js';
const secretKey = window.env.SECRET_KEY;
const apiKey = window.env.API_KEY;

// inputs
const form = document.querySelector('.header__right');
const searchInput = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const searchResults = document.querySelector('.container');
const showMoreBtn = document.querySelector('.show-more-btn');

let inputData = '';
let page = 1;

async function searchImage() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = '';
  }

  results.map(result => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.small;
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