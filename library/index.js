// burger menu

const burgerBtn = document.querySelector('.burger')
const menu = document.querySelector('.nav-desk')
const links = document.querySelector('.nav-list')

function toggleMenu() {
  burgerBtn.classList.toggle('burger-active')
  menu.classList.toggle('nav-desk-active')
  document.body.classList.toggle('lock')
}

function closeMenu() {
  burgerBtn.classList.remove('burger-active')
  menu.classList.remove('nav-desk-active')
  document.body.classList.remove('lock')
}

document.addEventListener('click', (e) => {
  if (e.composedPath().includes(burgerBtn)) {
    toggleMenu()
  }

  if (e.composedPath().includes(links)) {
    toggleMenu()
  }

  if (!e.target.classList.contains('burger') && !e.target.closest('nav')) {
    closeMenu()
  }
})

// slider

function aboutSlider() {
  const slides = document.querySelector('.carousel-gal')
  const leftArrow = document.querySelector('.left-arrow')
  const rightArrow = document.querySelector('.right-arrow')
  const paginators = document.querySelector('.carousel-pags')
  const leftSvg = document.getElementById('leftArrow')
  const rightSvg = document.getElementById('rightArrow')
  let currenSlide = 0

  function changeSlide() {
    currenSlide === 0
      ? leftArrow.classList.add('end')
      : leftArrow.classList.remove('end')
    currenSlide === 4
      ? rightArrow.classList.add('end')
      : rightArrow.classList.remove('end')

    document.querySelector('.pag-active').classList.remove('pag-active')
    slides.style.transform = 'translateX(' + currenSlide * -475 + 'px)'
  }

  document.querySelectorAll('.carousel-pag').forEach((indicator, ind) => {
    indicator.addEventListener('click', () => {
      currenSlide = ind
      changeSlide()
      indicator.classList.add('pag-active')
    })
  })

  leftArrow.addEventListener('click', () => {
    currenSlide = currenSlide > 0 ? currenSlide - 1 : 0
    changeSlide()
    paginators.children[currenSlide].classList.add('pag-active')
  })

  rightArrow.addEventListener('click', () => {
    currenSlide = currenSlide < 4 ? currenSlide + 1 : 4
    changeSlide()
    paginators.children[currenSlide].classList.add('pag-active')
  })
}

aboutSlider()

// tabs by season

;(function () {
  let tabNavs = document.querySelectorAll('.radio-group')

  tabNavs.forEach((item) => {
    item.addEventListener('click', function () {
      tabNavs.forEach((item) => {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      console.log('this, selectBooksSeason :', this);
      showSeasonsBooks(this.getAttribute('data-tab-name'));
    });
  });

  function showSeasonsBooks(booksSeason) {

    let oldActive = document.querySelector('.tabs>.books-wrap.is-active');
    let newActive = document.querySelector('.tabs>.books-wrap.' + booksSeason);
    oldActive.classList.remove('fade-in');
    oldActive.classList.add('fade-out');
    setTimeout(() => {
      newActive.classList.remove('fade-out');
      newActive.classList.add('fade-in');
      newActive.classList.add('is-active');
      oldActive.classList.remove('is-active');
    }, 500);
  }
})();

// drop menus

const dropMenuBtn = document.querySelector('.header-account');
const dropMenuNoAuth = document.querySelector('.no-auth');
const dropMenuWithAuth = document.querySelector('.with-auth');
const timeout = 500; // таймаут для блокировки скролла

if (dropMenuBtn) {
  dropMenuBtn.addEventListener('click', (e) => {
    dropMenuNoAuth.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('.no-auth') && !e.target.closest('.header-account') && !e.target.classList.contains('header-account')) {
      dropMenuNoAuth.classList.remove('open');
    }
  });
}

// modals

const modal = document.querySelector('.modal');

if (modal) {
  let isOpenModalReg = false; // check for open modal register
  // all of modal for register
  const regModal = document.querySelector('.modal-reg');
  const reModalContent = document.querySelector('.modal-reg-wrap');
  // buttons for register modal
  const dropNARegBtn = document.querySelector('.log-reg'); // in drop no auth
  const closeModalRegBtn = document.querySelector('.modal-btn-close');
  const loginInRegModal = document.querySelector('.modal-reg-btn-foot');
  const cardRegBtn = document.querySelector('.get-acc-reg');

  let isOpenModalLog = false; // check for open modal login
  // elements for login modal
  const logModal = document.querySelector('.modal-log');
  const logModalContent = document.querySelector('.modal-log-wrap');
  // buttons for login modal
  const dropNALogBtn = document.querySelector('.log-log');
  const cardLogBtn = document.querySelector('.get-acc-log');
  const closeModalLogBtn = document.querySelector('.modal-btn-close-log');
  const regInLogModal = document.querySelector('.modal-reg-btn-foot');

  // ---------------------------------------------------------------------------

  // open register modal
  function openRegModal() {
    regModal.classList.add('open-modal-reg');
    document.body.classList.add('lock');
    isOpenModalReg = true;
  };
  // close register modal
  function closeRegModal() {
    regModal.classList.remove('open-modal-reg');
    document.body.classList.remove('lock');
    isOpenModalReg = false;
  };

  // open login modal
  function openLogModal() {
    logModal.classList.add('open-modal-log');
    document.body.classList.add('lock');
    isOpenModalLog = true;
  };
  // close login modal
  function closeLogModal() {
    logModal.classList.remove('open-modal-log');
    document.body.classList.remove('lock');
    isOpenModalLog = false;
  };

  // ---------------------------------------------------------------------------

  // user are not registered or not auth => open reg modal
  if (localStorage.getItem('userRegistered') !== 'true' || localStorage.getItem('userAuthorized') !== 'true') {

    // click on regBtn in dropNoAuth
    dropNARegBtn.addEventListener('click', (e) => {
      openRegModal();
      e.stopPropagation();
      dropMenuNoAuth.classList.remove('open');
    });

    // click on 'singup'btn in library card section
    cardRegBtn.addEventListener('click', (e) => {
      openRegModal();
      e.stopPropagation();
      dropMenuNoAuth.classList.remove('open');
    });

    // close reg modal 'X'
    closeModalRegBtn.addEventListener('click', closeRegModal);

    // close reg modal with click outZone
    document.addEventListener('click', (e) => {
      if (isOpenModalReg === true && !e.target.closest('.modal-reg-wrap')) {
        closeRegModal();
      }
    });

    // click on 'login' in reg modal => open login modal ------------- don`t work
    loginInRegModal.addEventListener('click', (e) => {
      console.log(loginInRegModal);
      closeRegModal();
      openLogModal();
      e.stopPropagation();
    });
  }

  // ---------------------------------------------------------------------------
  
  // not auth => open login modal
  if (localStorage.getItem('userAuthorized') !== true) {

    // click on login btn in dropMenu 
    dropNALogBtn.addEventListener('click', (e) => {
      openLogModal();
      e.stopPropagation();
      dropMenuNoAuth.classList.remove('open');
    });

    // click on login btn in library card section
    cardLogBtn.addEventListener('click', (e) => {
      openLogModal();
      e.stopPropagation();
      dropMenuNoAuth.classList.remove('open');
    });

    // click on 'X' btn in login modal
    closeModalLogBtn.addEventListener('click', closeLogModal);

    // close login modal with click outZone
    document.addEventListener('click', (e) => {
      if (isOpenModalLog === true && !e.target.closest('.modal-log-wrap')) {
        closeLogModal();
      }
    });

    // click on register btn in login modal => open register modal ------------- don`t work
    regInLogModal.addEventListener('click', (e) => {
      closeLogModal();
      openRegModal();
      e.stopPropagation();
    });
  }

  // ---------------------------------------------------------------------------

  // user are not auth, click on but btn => open login modal
  if (localStorage.getItem('userAuthorized') !== true) {
    const buyBtns = document.querySelectorAll('.buy-btn');

    buyBtns.forEach(function(el) {
      el.addEventListener('click', function(e) {
        openLogModal();
        e.stopPropagation();
      });
    });
  }

  // ---------------------------------------------------------------------------

  //buy card modal
  const buyCardModal = document.querySelector('.modal-buy-card');
  const closeBCModal = document.querySelector('.modal-buy-close');
  const buyCardBtn = document.querySelector('.buy-card-btn');
  const buyBookBtns = document.querySelectorAll('.buy-btn');
  
  let isOpenBuyCardModal = false;

  function openBuyCardModal() {
    buyCardModal.classList.add('modal-buy-card-open');
    document.body.classList.add('lock');
    isOpenBuyCardModal = true;
  }

  function closeBuyCardModal() {
    buyCardModal.classList.remove('modal-buy-card-open');
    document.body.classList.remove('lock');
    isOpenBuyCardModal = false;
  }

  closeBCModal.addEventListener('click', closeBuyCardModal);

  document.addEventListener('click', (e) => {
    if (isOpenBuyCardModal === true && !e.target.closest('.modal-buy-card')) {
      closeBuyCardModal();
    }
  });

  // user auth, click on buy btn => open BCModal
  if (localStorage.getItem('userAuthorized') === true && localStorage.getItem('userSubs') === 'false') {
    buyBookBtns.forEach(function(el) {
      el.addEventListener('click', function(e) {
        openBuyCardModal();
        e.stopPropagation();
      });
    });
  }
  
}

// ---------------------------------------------------------------------------

// registration

const regForm = document.querySelector('.form-reg');
// inputs
const regNameInpt = document.querySelector('.reg-name');
const regLastNameInpt = document.querySelector('.reg-lastname');
const regEmailInpt = document.querySelector('.reg-mail');
const regPassInpt = document.querySelector('.reg-pass');
// submit btn
const regFormBtn = document.querySelector('.reg-btn-signup');

// visits counter
const  visitsCounter = (userVisits) => {
  userVisits++;
  localStorage.setItem('userVisits', userVisits)
}

regFormBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  document.body.classList.add('lock');

  //get from inputs
  let regNameValue = regNameInpt.value.split(/\s+/).join(''); // removing any spaces
  let regLastNameValue = regLastNameInpt.value.split(/\s+/).join('');
  let regEmailValue = regEmailInpt.value.toLowerCase().split(/\s+/).join('');
  let regPassValue = regPassInpt.value.split(/\s+/).join('');

  //validation
  let isValidRegFormNotCorrect = false;

  if (regNameValue === '') {
    alert('Заполните поле "Name"');
    isValidRegFormNotCorrect = true;
  } else {
    regNameValue = `${regNameValue[0].toUpperCase()}${regNameValue.slice(1).toLowerCase()}`;
    localStorage.setItem('userName', regNameValue);
  }

  if (regLastNameValue === '') {
    alert('Заполните поле "Last Name"');
    isValidRegFormNotCorrect = true;
  } else {
    regLastNameValue = `${regLastNameValue[0].toUpperCase()}${regLastNameValue.slice(1).toLowerCase()}`;
    localStorage.setItem('userLastName', regLastNameValue);
  }

  if (regEmailValue === '') {
    alert('Заполните поле "E-mail"');
    isValidRegFormNotCorrect = true;
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(regEmailValue)) {
    alert('Введите корректный адрес электронной почты');
    isValidRegFormNotCorrect = true;
  } else {
    localStorage.setItem('userEmail', regEmailValue);
  }

  if (regPassValue === '') {
    alert('Заполните поле "Password"');
    isValidRegFormNotCorrect = true;
  } else if (regPassValue.length < 8) {
    alert('Пароль должен содержать не менее 8 символов');
    isValidRegFormNotCorrect = true;
  } else {
    localStorage.setItem('userPassword', regPassValue);
  }

  // if got some issues => back to start

  if (isValidRegFormNotCorrect === true) {
    return;
  }

  //after registration => close reg form
  regFormBtn.addEventListener('click', () => {
    closeRegModal();
  });

  localStorage.removeItem('userVisits'); //removin counters

  let userVisits = Number(localStorage.getItem('userVisits')); // counter for user

  visitsCounter(userVisits); // increasing count by 1

  localStorage.setItem('userSubs', false);
  localStorage.setItem('userOwnedBooks', 0);

  location.reload() // refreshing page

  // generate card number
  let cardNumber = Math.floor(Math.random() * 0xFFFFFFF).toString(16).padStart(9, '0');
  localStorage.setItem('cardNumber', cardNumber);

  localStorage('userRegistered', true);
  localStorage('userAuthorized', true);
});

regFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
});