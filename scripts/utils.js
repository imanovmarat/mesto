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

const openZoomPopup = (card) => {
  const cardImage = card.querySelector('.place__image');
  const cardTitle = card.querySelector('.place__title');

  imageZoomPopup.src = cardImage.src;
  imageZoomPopup.alt = cardImage.alt;
  titleZoomPopup.textContent = cardTitle.textContent;

  openPopup(zoomPopup);
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

export {initialCards, config, openZoomPopup, openPopup, closePopup};


