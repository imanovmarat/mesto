'use strict';
import { initialCards, config,
  cardListSelector, cardSelector, editNameButton, addCardButton, forms,
  inputName, inputPosition, inputTitle, inputLink } from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";



//Валидация форм в попапах

const addCardFormValidator = new FormValidator(config, forms['add-card']);
const editProfileFormValidator = new FormValidator(config, forms['editor']);

//Перебор карточек

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (evt) => {
        const ZoomPopup = new PopupWithImage(evt.target, '.popup_type_full-img');
        ZoomPopup.open();
      }
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
  submitter: (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(personPopup._getInputValues());
    personPopup.close();
  }
}, '.popup_type_edit-profile');

const addPopup = new PopupWithForm({
  submitter: (evt) => {
    evt.preventDefault();
    const card = new Card({
      data: {
        name: inputTitle.value,
        link: inputLink.value
      },
      handleCardClick: (evt) => {
        const ZoomPopup = new PopupWithImage(evt.target, '.popup_type_full-img');
        ZoomPopup.open();
      }
    }, cardSelector);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    addPopup.close();
  }
}, '.popup_type_add-card');

// Слушатели на кнопки открытия попапов

editNameButton.addEventListener('click', () => {
  const currentUserData = userInfo.getUserInfo();
  inputName.value = currentUserData.name;
  inputPosition.value = currentUserData.position;
  editProfileFormValidator.enableValidation(false);
  personPopup.open();
});

addCardButton.addEventListener('click', () => {
  addCardFormValidator.enableValidation(false);
  addPopup.open();
});

// Вызов перебора начального массива

cardList.renderItems();
