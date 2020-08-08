export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add('popup_opened');
    this._handleEscClose();
  }

  close() {
    this._element.classList.remove('popup_opened');
    this._handleEscClose();
  }

  _handleEscClose() {
    this._escListener = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    };

    if (this._element.classList.contains('popup_opened')) {
      document.addEventListener('keydown', this._escListener);
    } else {
      document.removeEventListener('keydown', this._escListener);
    }
  }

  setEventListeners() {
    this._closeButton = this._element.querySelector('.popup__button_type_close');

    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._element.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}
