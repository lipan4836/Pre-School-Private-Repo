// console.log('1. Вёрстка соответствует макету. Ширина экрана 768px\t( total: +26 )\n\t- блок <header>\t( +2 )\n\t- секция Welcome\t( +2 )\n\t- секция About\t( +4 )\n\t- секция Favorites\t( +2 )\n\t- Сделать кнопку own, вместо buy для последней книги\t( +2 )\n\t- секция CoffeShop\t( +4 )\n\t- секция Contacts\t( +4 )\n\t- секция LibraryCard\t( +4 )\n\t- блок <footer>\t( +2 )\n\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется\t( total: +12 )\n\t- нет полосы прокрутки при ширине страницы от 1440рх до 640рх\t( +4 )\n\t- элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх\t( +4 )\n\t- элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх\t( +4 )\n\n3. На ширине экрана 768рх реализовано адаптивное меню\t( total: +12 )\n\t- Иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа\t( +2 )\n\t- при нажатии на бургер-иконку плавно появляется адаптивное меню\t( +4 )\n\t- при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран\t( +2 )\n\t- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается\t( +2 )\n\t- размеры открытого бургер-меню соответствуют макету\t( +2 )');

// burger menu

const burgerBtn = document.querySelector('.burger');
const menu = document.querySelector('.nav-desk');
const links = document.querySelector('.nav-list');

function toggleMenu() {
  burgerBtn.classList.toggle('burger-active');
  menu.classList.toggle('nav-desk-active');
  document.body.classList.toggle('lock');
}

function closeMenu() {
  burgerBtn.classList.remove('burger-active');
  menu.classList.remove('nav-desk-active');
  document.body.classList.remove('lock');
}

document.addEventListener('click', (e) => {
  if (e.composedPath().includes(burgerBtn)) {
    toggleMenu();
  };

  if (e.composedPath().includes(links)) {
    toggleMenu();
  };

  if (!e.target.classList.contains('burger') && !e.target.closest('nav')) {
    closeMenu();
  };
});

// slider

function aboutSlider() {
  const slides = document.querySelector('.carousel-gal');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const paginators = document.querySelector('.carousel-pags');
  const leftSvg = document.getElementById('leftArrow');
  const rightSvg = document.getElementById('rightArrow');
  let currenSlide = 0;

  function changeSlide() {
    currenSlide === 0 ? leftArrow.classList.add('end') : leftArrow.classList.remove('end');
    currenSlide === 4 ? rightArrow.classList.add('end') : rightArrow.classList.remove('end');
    
    document.querySelector('.pag-active').classList.remove('pag-active');
    slides.style.transform = 'translateX(' + (currenSlide) * -475 + 'px)';
  }

  document.querySelectorAll('.carousel-pag').forEach((indicator, ind) => {
    indicator.addEventListener('click', () => {
      currenSlide = ind;
      changeSlide();
      indicator.classList.add('pag-active');
    });
  });

  leftArrow.addEventListener('click', () => {
    currenSlide = (currenSlide > 0) ? currenSlide - 1 : 0;
    changeSlide();
    paginators.children[currenSlide].classList.add('pag-active');
    
  });

  rightArrow.addEventListener('click', () => {
    currenSlide = (currenSlide < 4) ? currenSlide + 1 : 4
    changeSlide();
    paginators.children[currenSlide].classList.add('pag-active');
  });
}

aboutSlider();

// tabs by season

let changeTab = function() {
  let tabNavs = document.querySelectorAll('.radio-group'),
      books = document.querySelectorAll('.books-wrap'),
      booksSeason;
  
  tabNavs.forEach( item => {
    item.addEventListener('click', selectBooksSeason);
  })

  function selectBooksSeason () {
    tabNavs.forEach( item => {
      item.classList.remove('is-active');
    });
    this.classList.add('is-active');
    console.log('this, selectBooksSeason :', this);
    booksSeason = this.getAttribute('data-tab-name');
    showSeasonsBooks(booksSeason);
  }

  function showSeasonsBooks (booksSeason) {
    // booksSeason.classList.add('fade-out')
    console.log('booksSeason', booksSeason);
    console.log('this, showSeasonsBooks :', this);
    books.forEach( item => {
      if (item.classList.contains(booksSeason)) {
        item.classList.add('fade-in');
        item.classList.add('is-active');
        // setTimeout(() => {
        //   item.classList.remove('fade-in');
        // }, 500); 
        // setTimeout(() => {
        //   item.classList.add('is-active');
        // }, 500); 
      } else {
        // item.classList.add('fade-out');
        item.classList.remove('is-active');
        item.classList.remove('fade-in');
      }
      // item.classList.contains(booksSeason) ? 
      // item.classList.add('is-active') & item.classList.add('fade-in') :
      // item.classList.remove('fade-in') & item.classList.add('fade-out') & item.classList.remove('is-active')
    })
  }
}

changeTab()

// не реализован fade-out

// drop menus

const dropMenuBtns = document.querySelectorAll('.account');
const dropMenuNoAuth = document.querySelector('.no-auth');
const dropMenuWithAuth = document.querySelector('.with-auth');
const popupCloseIcon = document.querySelectorAll('.close-popup');
const timeout = 500; // таймаут для блокировки скролла

