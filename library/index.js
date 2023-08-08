console.log('тут будет самооценка');

// burger menu

const burgerBtn = document.querySelector('.burger');
const menu = document.querySelector('.nav-desk');
const links = document.querySelector('.nav-list');

document.addEventListener('click', (e) => {
  const click = e.composedPath();

  if (click.includes(burgerBtn)) {
    burgerBtn.classList.toggle('burger-active');
    menu.classList.toggle('nav-desk-active');
    document.body.classList.toggle('lock');
  };

  if (click.includes(links)) {
    burgerBtn.classList.toggle('burger-active');
    menu.classList.toggle('nav-desk-active');
    document.body.classList.toggle('lock');
  };

  if (!e.target.classList.contains('burger') && !e.target.closest('nav')) {
    burgerBtn.classList.remove('burger-active');
    menu.classList.remove('nav-desk-active');
    document.body.classList.remove('lock');
  };
});