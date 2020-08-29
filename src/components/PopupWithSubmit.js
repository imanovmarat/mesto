import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__container');
    this._submitter = '';
    this.setEventListeners();
  }
  open({submitter}) {
    super.open();
    this._submitter = submitter;
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
