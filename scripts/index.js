const cards = document.querySelector('.places'),
      cardTemplate = document.querySelector('#place').content;

const editNameButton = document.querySelector('.profile__button_type_edit'),
      addCardButton = document.querySelector('.profile__button_type_add');

const popups = Array.from(document.querySelectorAll('.popup')),
      forms = document.forms;

// Открытие и закрытие попапов

const escListener = (evt) => {
  const openPopup = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
    popupToggle(openPopup);
  }
};

const popupToggle = (popup) => {
  if (popup.classList.contains('popup_opened')) {
    document.removeEventListener('keydown', escListener)
  } else {
    document.addEventListener('keydown', escListener)
  }

  popup.classList.toggle('popup_opened');
}

// Слушатели на кнопки открытия попапов

editNameButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_edit-profile');
  popupToggle(popup)
})

addCardButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_add-card');
  popupToggle(popup)
})

//  Вывод на экран карточки

const renderCard = (card) => {
  cards.prepend(card);
};

//Устанавливаем слушателей на карточку

const setListeners = (card) => {
  const like = card.querySelector('.place__like'),
        removeButton = card.querySelector('.place__remove'),
        image = card.querySelector('.place__image');

  like.addEventListener('click', evt => {
    evt.target.classList.toggle('place__like_active');
  })

  removeButton.addEventListener('click', evt => {
    evt.target.closest('.place').remove();
  })

  image.addEventListener('click', evt => {
    const card = evt.target.closest('.place')
    fullImagePopup(card);
  })
};

// Создание карточки

const createCard = (name, link) => {
  const card = cardTemplate.cloneNode(true),
        image = card.querySelector('.place__image'),
        title = card.querySelector('.place__title');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  setListeners(card);
  renderCard(card);
};

// Перебор начального массива

initialCards.reverse().forEach((item) => {
  createCard(item.name, item.link);
});

//Устанавливаем слушатели на попапы

const setPopupListeners = (popup) => {
  const closeButton = popup.querySelector('.popup__button_type_close');

  closeButton.addEventListener('click', () => {
    popupToggle(popup);
  })

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      popupToggle(popup);
    }
  })
};

popups.forEach(popup => {
  setPopupListeners(popup);
})

// Попап с редактированием персоны

const editProfilePopup = document.querySelector('.popup_type_edit-profile')
profileName = document.querySelector('.profile__name'),
  profilePosition = document.querySelector('.profile__position'),
  inputName = forms.editor.elements['name-input'],
  inputPosition = forms.editor.elements['position-input'];

inputName.value = profileName.textContent;
inputPosition.value = profilePosition.textContent;

editProfilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profilePosition.textContent = inputPosition.value;
  popupToggle(editProfilePopup);
})

// Попап с формой добавления карточки

const addCardPopup = document.querySelector('.popup_type_add-card'),
  addCardForm = forms['add-card'];
  inputTitle = addCardForm.elements['card-name-input'],
  inputLink = addCardForm.elements['card-image-input'];

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createCard(inputTitle.value, inputLink.value);
  addCardForm.reset();
  popupToggle(addCardPopup);
})

// Попапчик с полной картинкой

const fullImagePopup = (card) => {
  const cardImage = card.querySelector('.place__image'),
    cardTitle = card.querySelector('.place__title');

  const popup = document.querySelector('.popup_type_full-img'),
    image = popup.querySelector('.popup__image'),
    title = popup.querySelector('.popup__image-caption');

  image.src = cardImage.src;
  image.alt = cardImage.alt;
  title.textContent = cardTitle.textContent;

  popupToggle(popup);
};

// Данные для валидации

const config = {
  formSelector: '.popup__container_size_small',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(config);
