export default class Card {
  constructor({userId, data, handleCardClick, handleRemoveCard, handleLikeClick }, cardSelector) {
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._imgLink = data.link;
    this._cardId = data._id;
    this._imgAltText = data.name;
    this._title = data.name;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
    this._selector = cardSelector;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return this._element = cardElement;
  }

  setLikeInfo(likes) {
    this._likes = likes;

    this._likeButton.classList.toggle('place__like_active');
    this._likeCounterElement.textContent = likes.length;
  }

  _setLikes() {
    this._likeCounterElement = this._element.querySelector('.place__like-counter');
    this._likeCounterElement.textContent = this._likes.length;
  }

  _setLikeListener() {
    this._likeButton = this._element.querySelector('.place__like');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    })
  }

  _setImgListener() {
    this._image = this._element.querySelector('.place__image');
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._imgLink, this._title)
    });
  }

  _setRemoveBtnListener() {
    this._removeButton = this._element.querySelector('.place__remove');
    this._removeButton.addEventListener('click', () => {
      this._handleRemoveCard(this._cardId);
    })
  }

  isLikedByMe() {
    return this._likes.some(({_id}) => {
      return _id === this._userId;
    });
  }

  createCard() {
    this._getElement();
    const cardImage = this._element.querySelector('.place__image');
    const cardTitle = this._element.querySelector('.place__title');

    if (this.isLikedByMe()) {
      this._likeButton = this._element.querySelector('.place__like');
      this._likeButton.classList.toggle('place__like_active');
    }
    this._setLikes();
    this._setLikeListener();
    this._setImgListener();

    if (this._ownerId === this._userId) {
      this._setRemoveBtnListener();
    } else {
      this._element.querySelector('.place__remove').remove();
    }
    cardImage.src = this._imgLink;
    cardImage.alt = this._imgAltText;
    cardTitle.textContent = this._title;
    return this._element;
  }
}
