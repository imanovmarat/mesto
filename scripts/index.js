'use strict'

const cards = document.querySelector('.places');
const cardTemplate = document.querySelector('#place').content;

const editNameButton = document.querySelector('.profile__button_type_edit');
const addCardButton = document.querySelector('.profile__button_type_add');

const popups = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const inputName = editProfilePopup.querySelector('.popup__input_field_first');
const inputPosition = editProfilePopup.querySelector('.popup__input_field_second');

const addCardPopup = document.querySelector('.popup_type_add-card');
const inputTitle = addCardPopup.querySelector('.popup__input_field_first');
const inputLink = addCardPopup.querySelector('.popup__input_field_second');

const zoomPopup = document.querySelector('.popup_type_full-img');
const imageZoomPopup= zoomPopup.querySelector('.popup__image');
const titleZoomPopup = zoomPopup.querySelector('.popup__image-caption');

const config = {
  formSelector: '.popup__container_size_small',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Открытие и закрытие попапов

const escListener = (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
};

const setEscListener = () => {
  document.addEventListener('keydown', escListener);
};

const removeEscListener = () => {
  document.removeEventListener('keydown', escListener);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  setEscListener();
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  removeEscListener();
};

//Валидация форм в попапах

const checkButtonState = (popup) => {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  const buttonElement = popup.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config)
};

const currentPersonData = () => {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
};

const removeInputError = (popup) => {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  inputList.forEach(input => hideInputError(popup, input, config));
};

// Попапчик с полной картинкой

const openZoomPopup = (card) => {
  const cardImage = card.querySelector('.place__image');
  const cardTitle = card.querySelector('.place__title');

  imageZoomPopup.src = cardImage.src;
  imageZoomPopup.alt = cardImage.alt;
  titleZoomPopup.textContent = cardTitle.textContent;

  openPopup(zoomPopup);
};

//Устанавливаем слушателей на карточку

const setListeners = (card) => {
  const like = card.querySelector('.place__like');
  const removeButton = card.querySelector('.place__remove');
  const image = card.querySelector('.place__image');

  like.addEventListener('click', evt => {
    evt.target.classList.toggle('place__like_active');
  })

  removeButton.addEventListener('click', evt => {
    evt.target.closest('.place').remove();
  })

  image.addEventListener('click', evt => {
    const card = evt.target.closest('.place');
    openZoomPopup(card);
  })
};

// Создание карточки

const createCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.place__image');
  const title = card.querySelector('.place__title');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  setListeners(card);
  return card;
};

//  Вывод на экран карточки

const renderCard = (cardData) => {
  const card = createCard(cardData);
  cards.prepend(card);
};

// Перебор начального массива
const renderInintialCards = (array) => {
  array.reverse().forEach((cardData) => {
    renderCard(cardData);
  });
};

//Устанавливаем слушатели на попапы

const setPopupListeners = (popup) => {
  const closeButton = popup.querySelector('.popup__button_type_close');

  closeButton.addEventListener('click', () => {
    closePopup(popup);
  })

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
};

// Слушатели на кнопки открытия попапов

editNameButton.addEventListener('click', () => {
  currentPersonData();
  removeInputError(editProfilePopup);
  checkButtonState(editProfilePopup);
  openPopup(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  const form = addCardPopup.querySelector(config.formSelector);
  form.reset();
  removeInputError(addCardPopup);
  checkButtonState(addCardPopup);
  openPopup(addCardPopup);
});

// Слушатели на сабмиты форм

editProfilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profilePosition.textContent = inputPosition.value;
  closePopup(editProfilePopup);
})

addCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = {};
  cardData.name = inputTitle.value;
  cardData.link = inputLink.value;
  renderCard(cardData);
  closePopup(addCardPopup);
})

//Установка слушателей на попапы

popups.forEach(popup => {
  setPopupListeners(popup);
});
// Вызов перебора начального массива
renderInintialCards(initialCards);

// Вызов валидации
enableValidation(config);
