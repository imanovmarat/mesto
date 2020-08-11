import Popup from './Popup.js';
import {imageZoomPopup, titleZoomPopup} from "../utils/utils.js";

export default class PopupWithImage extends Popup{
  constructor(imageElement, popupSelector) {
    super(popupSelector);
    this._cardElement = imageElement.closest('.place');
  }

  open() {
    super.open();
    super.setEventListeners();
    this._cardImage = this._cardElement.querySelector('.place__image');
    this._cardTitle = this._cardElement.querySelector('.place__title');

    imageZoomPopup.src = this._cardImage.src;
    imageZoomPopup.alt = this._cardImage.alt;
    titleZoomPopup.textContent = this._cardTitle.textContent;
  }
}
