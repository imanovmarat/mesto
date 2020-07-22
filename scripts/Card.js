class Card {
  constructor(data, cardSelector) {
    this._imgLink = data.link;
    this._imgAltText = data.name;
    this._title = data.name;
    this._selector = cardSelector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .cloneNode(true);

    return this._element = cardElement;
  }

  _setLikeListener() {
    const likeButton = this._element.querySelector('.place__like');
    likeButton.addEventListener('click', evt => {
      evt.target.classList.toggle('place__like_active');
    })
  }

  _setImgListener() {
    const image = this._element.querySelector('.place__image');
    image.addEventListener('click', evt => {
      const card = evt.target.closest('.place');
      openZoomPopup(card);
    })
  }

  _setRemoveBtnListener() {
    const removeButton = this._element.querySelector('.place__remove');
    removeButton.addEventListener('click', evt => {
      evt.target.closest('.place').remove();
    })
  }

  renderCard() {
    this._getElement();
    const image = this._element.querySelector('.place__image');
    const title = this._element.querySelector('.place__title');
    this._setLikeListener();
    this._setImgListener()
    this._setRemoveBtnListener();
    image.src = this._imgLink;
    image.alt = this._imgAltText;
    title.textContent = this._title;

    return this._element;
  }
}

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

const renderInintialCards = (array) => {
  array.reverse().forEach((cardData) => {
    const card = new Card(cardData, '#place');
    const cardElement = card.renderCard();

    document.querySelector('.places').append(cardElement);
  });
};

renderInintialCards(initialCards);


