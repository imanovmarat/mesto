'use strict';
import './index.css';

import { initialCards, config,
  cardListSelector, cardSelector, editNameButton, addCardButton, forms,
  inputName, inputPosition} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Колбэк открытия попапа с увеличенной картинкой

const openZoomPopup = (evt) => {
  const zoomPopup = new PopupWithImage(evt.target, '.popup_type_full-img');
  zoomPopup.open();
};

//Валидация форм в попапах

const addCardFormValidator = new FormValidator(config, forms['add-card']);
const editProfileFormValidator = new FormValidator(config, forms['editor']);

//Перебор карточек

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: openZoomPopup
    }, cardSelector);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

// Экземпляр класса для работы с профилем

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  positionSelector: '.profile__position'
});

// Попапы с формами

const personPopup = new PopupWithForm({
  submitter: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
}, '.popup_type_edit-profile');

const addPopup = new PopupWithForm({
  submitter: (inputValues) => {
    const card = new Card({
      data: {
        name: inputValues['card-name-input'],
        link: inputValues['card-image-input']
      },
      handleCardClick: openZoomPopup
    }, cardSelector);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.popup_type_add-card');

// Слушатели на кнопки открытия попапов

editNameButton.addEventListener('click', () => {
  const currentUserData = userInfo.getUserInfo();
  inputName.value = currentUserData.name;
  inputPosition.value = currentUserData.position;
  editProfileFormValidator.resetForm();
  personPopup.open();
});


addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetForm();
  addPopup.open();
});

// Вызов перебора начального массива

cardList.renderItems();

// Вызов валидации форм

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
