import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor({ submitter } , popupSelector) {
    super(popupSelector);
    this._submitter = submitter;
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__container');
    this._buttonElement = this._popupElement.querySelector('.popup__button_type_submit');
    this._buttonText = this._buttonElement.textContent;
    this.setEventListeners();
  }

  loading() {
    this._buttonElement.textContent = this._buttonText;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonElement.textContent = 'Сохранение...';
      this._submitter(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
