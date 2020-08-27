import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
  constructor({submitter}, popupSelector) {
    super(popupSelector);
    this._submitter = submitter;
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__container');
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitter();
      this.close();
    });
  }

}
