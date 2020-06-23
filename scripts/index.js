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

const places = document.querySelector('.places'),
      placeTemplate = document.querySelector('#place').content;

initialCards.forEach(function (placeobj) {
  const placeElement = placeTemplate.cloneNode(true);
  placeElement.querySelector('.place__image').src = placeobj.link;
  placeElement.querySelector('.place__image').alt = placeobj.name;
  placeElement.querySelector('.place__title').textContent = placeobj.name;
  places.append(placeElement);
});

let popup = document.querySelector ('.popup'),
    nameEditBtn = document.querySelector('.profile__name-edit'),
    popupCloseBtn = popup.querySelector('.popup__close-btn'),
    name = document.querySelector('.profile__name'),
    position = document.querySelector('.profile__position'),
    nameInput =  popup.querySelector('.popup__input_field_name'),
    jobInput = popup.querySelector('.popup__field_field_position');

function popupToggle() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = name.textContent;
    jobInput.value = position.textContent;
  }
  popup.classList.toggle('popup_opened');

}

nameEditBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);


let formElement = popup.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    position.textContent = jobInput.value;

popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
