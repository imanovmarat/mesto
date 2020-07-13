const showInputError = (formElement, inputElement, errorMessage, config) => {
  const inputErrorClass = config.inputErrorClass,
        errorClass = config.errorClass,
        errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const  hideInputError = (formElement, inputElement, config) => {
  const inputErrorClass = config.inputErrorClass,
        errorClass = config.errorClass,
        errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListener = (formElement, config) => {
  const inputSelector = config.inputSelector,
        buttonSelector = config.submitButtonSelector;
  const buttonElement = formElement.querySelector(buttonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formSelector = config.formSelector;
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    setEventListener(formElement, config);
  });
};

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, config= 'popup__button_inactive') {
  const inactiveButtonClass = config.inactiveButtonClass || config;

  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}
