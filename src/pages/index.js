'use strict';
import './index.css';

import { config,
  cardListSelector, cardSelector, upgradeAvatarButton, editNameButton, addCardButton, forms,
  inputName, inputPosition} from '../utils/utils.js';

import Api from "../components/Api.js";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";

//Валидация форм в попапах

const addCardFormValidator = new FormValidator(config, forms['add-card']);
const editProfileFormValidator = new FormValidator(config, forms['editor']);
const upgradeAvatarFormValidator = new FormValidator(config, forms['update-avatar']);


// Экземпляр апи

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '07c4c298-6889-4e26-9c08-b58fb03c5fdf',
    'Content-Type': 'application/json'
  }
});

// Получение данных с сервера

api.getAppInfo().then(data => {
  const [profileData, initialCards] = data;

// Экземпляр класса для работы с профилем

  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    positionSelector: '.profile__position',
    avatarSelector: '.profile__avatar'
  });

  userInfo.setUserInfo({
    'name-input': profileData.name,
    'position-input': profileData.about,
  });
  userInfo.setAvatar(profileData.avatar);

//Перебор карточек

  const section = new Section(cardListSelector);

  const generateCard = (item) => {
    const card = new Card({
      userId: profileData._id,
      data: item,
      handleCardClick: (evt) => {
        const zoomPopup = new PopupWithImage(evt.target, '.popup_type_full-img');
        zoomPopup.open();
      },
      handleRemoveCard: (cardId) => {
        const popupWithSubmit = new PopupWithSubmit({
          submitter: () => {
            api.removeCard(cardId).then(data => {
              card.removeCard();
            }).catch(err => console.log(err));
          }
        }, '.popup_type_confirm');
        popupWithSubmit.open();
      },
      handleLikeClick: (cardId) => {
        if(card.isLikedByMe()) {
          api.removeLike(cardId).then(data => {
            card.setLikeInfo(data.likes);
          }).catch(err => console.log(err));
        } else {
          api.selLike(cardId).then(data => {
            card.setLikeInfo(data.likes);
          }).catch(err => console.log(err));
        }
      }
    }, cardSelector);

    const cardElement = card.createCard();
    section.addItem(cardElement);
  };

  section.renderItems({
    items: initialCards,
    renderer: generateCard
  });

  // Попапы с формами

  const upgradeAvatarPopup = new PopupWithForm({
    submitter: (inputValues) => {
      const link = inputValues['update-avatar-input'];
      api.upgradeAvatar(link)
        .then(data => {
          userInfo.setAvatar(data.avatar);
          upgradeAvatarPopup.close();
        }).catch(err => console.log(err));
    }
  }, '.popup_type_update-avatar');

  const personPopup = new PopupWithForm({
    submitter: (inputValues) => {
      api.editUserInfo(inputValues['name-input'], inputValues['position-input'])
        .then(() => {
          userInfo.setUserInfo(inputValues);
          personPopup.close();
        }).catch(err => console.log(err));

    }
  }, '.popup_type_edit-profile');

  const addPopup = new PopupWithForm({
    submitter: (inputValues) => {
      const name = inputValues['card-name-input'];
      const link = inputValues['card-image-input'];

      api.addNewCard(name, link).then(data => {
        generateCard(data);
        addPopup.close();
      }).catch(err => console.log(err));

    }
  }, '.popup_type_add-card');

// Слушатели на кнопки открытия попапов

  upgradeAvatarButton.addEventListener('click', () => {
    upgradeAvatarFormValidator.resetForm();
    upgradeAvatarPopup.open();
  });

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

}).catch(err => console.log(err));

upgradeAvatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
