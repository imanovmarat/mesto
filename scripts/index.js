'use strict'
import {initialCards} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


const cards = document.querySelector('.places');
const cardSelector = '#place';

const editNameButton = document.querySelector('.profile__button_type_edit');
const addCardButton = document.querySelector('.profile__button_type_add');

const popups = Array.from(document.querySelectorAll('.popup'));
const forms = document.forms;
console.log(forms);

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

const formList = Array.from(document.querySelectorAll(config.formSelector));

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

const addCardFormValidator = new FormValidator(forms['add-card']);
const editProfileFormValidator = new FormValidator(forms['editor']);


const currentPersonData = () => {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
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

//  Вывод на экран карточки

const renderCard = (card) => {
  cards.prepend(card);
};

// Перебор начального массива

const renderInitialCards = (array) => {
  array.reverse().forEach((cardData) => {
    const card = new Card(cardData, cardSelector);
    const cardElement = card.createCard();

    renderCard(cardElement);
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
  editProfileFormValidator.enableValidation(false);
  openPopup(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  const form = addCardPopup.querySelector(config.formSelector);
  form.reset();
  addCardFormValidator.enableValidation(false);
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
  const cardElement = new Card(cardData, cardSelector);
  renderCard(cardElement.createCard());
  closePopup(addCardPopup);
})

//Установка слушателей на попапы

popups.forEach(popup => {
  setPopupListeners(popup);
});

// Вызов перебора начального массива
renderInitialCards(initialCards);

// Вызов валидации
// enableValidation(config);

export {openZoomPopup, config};
