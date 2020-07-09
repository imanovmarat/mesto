// Перебор начального массива

initialCards.reverse().forEach((item) => {
  const titleNewCard = item.name,
      imageNewCard = item.link;
  renderCard(titleNewCard, imageNewCard);
});

// Вывод карточек на сайт

function renderCard(title, image) {
  const cardsContainer = document.querySelector('.places'),
        cardTemplate = document.querySelector('#place').content,
        cardElement = cardTemplate.cloneNode(true),
        cardLikeButton = cardElement.querySelector('.place__like'),
        cardRemoveButton = cardElement.querySelector('.place__remove');
  const cardImg = cardElement.querySelector('.place__image'),
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

// Открытие и закрытие всех попапов

/*
const popupOverlay = document.querySelector('.popup');
popupOverlay.addEventListener('click', (evt)=>{
  if(evt.target !== evt.currentTarget) {
    return;
  }
  popupToggle(popupOverlay);
})
*/

function popupToggle (popup){
  popup.classList.toggle('popup_opened');
};

// Попапчик с полной картинкой

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

  popupTemplate.addEventListener('click', (evt) => {
    if (evt.target !==evt.currentTarget) {
      return
    }
    popupToggle(popupTemplate);
  })

  closeBtn.addEventListener('click', toggleFullImgPopup);

popupToggle(popupTemplate);
}

//Попап с формой для редактирования профиля

const popup = document.querySelector ('.popup_type_edit-profile'),
      nameEditBtn = document.querySelector('.profile__button_type_edit'),
      popupCloseBtn = popup.querySelector('.popup__button_type_close'),
      name = document.querySelector('.profile__name'),
      position = document.querySelector('.profile__position'),
      nameInput =  popup.querySelector('.popup__input_field_first'),
      jobInput = popup.querySelector('.popup__input_field_second');

// if (!popup.classList.contains('popup_opened')) {
nameInput.value = name.textContent;
jobInput.value = position.textContent;
// }

nameEditBtn.addEventListener('click', function() {
  popupToggle(popup);
});

popupCloseBtn.addEventListener('click', function() {
  popupToggle(popup);
});
const formElement = popup.querySelector('.popup__container');

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  position.textContent = jobInput.value;
  popupToggle(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

//Попап с добавлением карточки

const addCardBtn = document.querySelector('.profile__button_type_add'),
      popupAddCard = document.querySelector('.popup_type_add-card'),
      createCard = popupAddCard.querySelector('.popup__container_size_small'),
      cardCloseBtn = popupAddCard.querySelector('.popup__button_type_close'),
      inputCardName = popupAddCard.querySelector('.popup__input_field_first'),
      inputCardImgLink = popupAddCard.querySelector('.popup__input_field_second');

addCardBtn.addEventListener('click', function() {
  popupToggle(popupAddCard);
});

cardCloseBtn.addEventListener('click', function() {
  popupToggle(popupAddCard);
});

createCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const titleNewCard = inputCardName.value,
        imageNewCard = inputCardImgLink.value;
  renderCard(titleNewCard, imageNewCard);
  inputCardName.value = '';
  inputCardImgLink.value = '';
  popupToggle(popupAddCard);
});
