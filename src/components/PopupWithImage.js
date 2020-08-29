import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupImageElement, popupTitleElement, popupSelector) {
    super(popupSelector);
    this._popupImageElement = popupImageElement;
    this._popupTitleElement = popupTitleElement;
    this._cardImage = '';
    this._cardTitle = '';
  }

  open(cardLink, cardTitle) {
    super.open();
    super.setEventListeners();

    this._cardImage = cardLink;
    this._cardTitle = cardTitle;

    this._popupImageElement.src = this._cardImage;
    this._popupImageElement.alt = this._cardTitle;
    this._popupTitleElement.textContent = this._cardTitle;
  }
}
