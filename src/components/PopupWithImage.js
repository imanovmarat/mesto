import Popup from './Popup.js';
import {imageZoomPopup, titleZoomPopup} from "../utils/utils.js";

export default class PopupWithImage extends Popup{
  constructor(popupImageElement, popupTitleElement, clickedPicture, popupSelector) {
    super(popupSelector);
    this._popupImageElement = popupImageElement;
    this._popupTitleElement = popupTitleElement;
    this._cardElement = clickedPicture.closest('.place');
  }

  open() {
    super.open();
    super.setEventListeners();
    this._cardImage = this._cardElement.querySelector('.place__image');
    this._cardTitle = this._cardElement.querySelector('.place__title');

    this._popupImageElement.src = this._cardImage.src;
    this._popupImageElement.alt = this._cardImage.alt;
    this._popupTitleElement.textContent = this._cardTitle.textContent;
  }
}
