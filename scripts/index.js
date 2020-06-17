let popup = document.querySelector ('.popup'),
    nameEditBtn = document.querySelector('.profile__name-edit'),
    popupCloseBtn = popup.querySelector('.popup__close-btn'),
    name = document.querySelector('.profile__name'),
    position = document.querySelector('.profile__position'),
    nameInput =  popup.querySelector('.popup__input_field_name'),
    jobInput = popup.querySelector('.popup__field_field_position');

function popupToggle() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = name.textContent;
    jobInput.value = position.textContent;
  }
  popup.classList.toggle('popup_opened');

}

nameEditBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);


let formElement = popup.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    position.textContent = jobInput.value;

popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
