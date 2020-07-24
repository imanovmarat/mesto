import {config} from './utils.js';

export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._setEventListener();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    this._submitButton = this._formElement.querySelector(config.submitButtonSelector);

    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListener() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleButtonState();
      });
    });
  }

  enableValidation(boolean) {
    if (boolean === false){
      this._inputList.forEach(inputElement => {
        this._hideInputError(inputElement);
      });
      this._toggleButtonState();
    }
  }
}
