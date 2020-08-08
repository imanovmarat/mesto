import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor({ submitter } , popupSelector) {
    super(popupSelector);
    this._submitter = submitter;
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__container');
    this.setEventListeners();
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues)
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._submitter);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
