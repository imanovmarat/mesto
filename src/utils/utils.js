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

const upgradeAvatarButton = document.querySelector('.profile__avatar-container');
const editNameButton = document.querySelector('.profile__button_type_edit');
const addCardButton = document.querySelector('.profile__button_type_add');

const forms = document.forms;

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const inputName = editProfilePopup.querySelector('.popup__input_field_first');
const inputPosition = editProfilePopup.querySelector('.popup__input_field_second');


export { config, imageZoomPopup, titleZoomPopup,
  cardListSelector, cardSelector, upgradeAvatarButton, editNameButton, addCardButton, forms,
  inputName, inputPosition};


