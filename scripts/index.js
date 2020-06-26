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

initialCards.reverse().forEach((item) => {
  let titleNewCard = item.name,
      imageNewCard = item.link;
  renderCard(titleNewCard, imageNewCard);
});

function renderCard(title, image) {
  const cardsContainer = document.querySelector('.places'),
        cardTemplate = document.querySelector('#place').content,
        cardElement = cardTemplate.cloneNode(true),
        cardLikeButton = cardElement.querySelector('.place__like'),
        cardRemoveButton = cardElement.querySelector('.place__remove');
  let  cardImg = cardElement.querySelector('.place__image'),
       cardTitle = cardElement.querySelector('.place__title');

  cardImg.src = image;
  cardImg.alt = title;
  cardTitle.textContent = title;

  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });

  cardRemoveButton.addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });

  cardImg.addEventListener('click', (evt) => {
    fullImgPopup (evt.target);
  });

  cardsContainer.prepend(cardElement);
}

function fullImgPopup (picture){
  const popupTemplate = document.querySelector('.popup_type_full-img'),
        closeBtn = popupTemplate.querySelector('.popup__button_type_close'),
        img = popupTemplate.querySelector('.popup__image'),
        imgTitle = popupTemplate.querySelector('.popup__image-caption');

  const cardTitle = picture.parentElement.querySelector('.place__title');

  img.src = picture.src;
  img.alt = picture.alt;
  imgTitle.textContent = cardTitle.textContent;

  function toggleFullImgPopup (){
    popupToggle(popupTemplate);
    closeBtn.removeEventListener('click', toggleFullImgPopup);
  }

  closeBtn.addEventListener('click', toggleFullImgPopup);

popupToggle(popupTemplate);
}

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

let popup = document.querySelector ('.popup_type_edit-profile'),
    nameEditBtn = document.querySelector('.profile__button_type_edit'),
    popupCloseBtn = popup.querySelector('.popup__button_type_close'),
    name = document.querySelector('.profile__name'),
    position = document.querySelector('.profile__position'),
    nameInput =  popup.querySelector('.popup__input_field_first'),
    jobInput = popup.querySelector('.popup__input_field_second');

nameEditBtn.addEventListener('click', function() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = name.textContent;
    jobInput.value = position.textContent;
  }
  popupToggle(popup);
});
popupCloseBtn.addEventListener('click', function() {
  popupToggle(popup);
});

let formElement = popup.querySelector('.popup__container');

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  position.textContent = jobInput.value;
  popupToggle(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

const addCardBtn = document.querySelector('.profile__button_type_add'),
      popupAddCard = document.querySelector('.popup_type_add-card'),
      createCard = popupAddCard.querySelector('.popup__button_type_submit'),
      cardCloseBtn = popupAddCard.querySelector('.popup__button_type_close'),
      inputCardName = popupAddCard.querySelector('.popup__input_field_first'),
      inputCardImgLink = popupAddCard.querySelector('.popup__input_field_second');

addCardBtn.addEventListener('click', function() {
  popupToggle(popupAddCard);
});
cardCloseBtn.addEventListener('click', function() {
  popupToggle(popupAddCard);
});
createCard.addEventListener('click', (evt) => {
  evt.preventDefault();
  const titleNewCard = inputCardName.value,
        imageNewCard = inputCardImgLink.value;

  renderCard(titleNewCard, imageNewCard);
  inputCardName.value = '';
  inputCardImgLink.value = '';
  popupToggle(popupAddCard);
});
