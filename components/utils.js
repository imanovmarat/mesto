const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__container_size_small',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};



// Попапчик с полной картинкой

const zoomPopup = document.querySelector('.popup_type_full-img');
const imageZoomPopup= zoomPopup.querySelector('.popup__image');
const titleZoomPopup = zoomPopup.querySelector('.popup__image-caption');

const cardListSelector = '.places';
const cardSelector = '#place';

const editNameButton = document.querySelector('.profile__button_type_edit');
const addCardButton = document.querySelector('.profile__button_type_add');

const forms = document.forms;

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const inputName = editProfilePopup.querySelector('.popup__input_field_first');
const inputPosition = editProfilePopup.querySelector('.popup__input_field_second');


const addCardPopup = document.querySelector('.popup_type_add-card');
const inputTitle = addCardPopup.querySelector('.popup__input_field_first');
const inputLink = addCardPopup.querySelector('.popup__input_field_second');

export { initialCards, config, imageZoomPopup, titleZoomPopup,
  cardListSelector, cardSelector, editNameButton, addCardButton, forms,
  inputName, inputPosition, inputTitle, inputLink };


