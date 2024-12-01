function buttonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList) === true) {
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.classList.remove('popup__button_disabled');
    }
};

function showError(element, errorMessage) {
    const formError = document.querySelector(`.${element.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add('popup__input_error');
};

function hideError(element) {
    const formError = document.querySelector(`.${element.id}-error`);
    formError.classList.remove('popup__input_error');
    formError.textContent = '';
};

function hasInvalidInput(element) {
    return element.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
};

function checkInputValidity(element, buttonElement, inputList) {
    const regex = /[-\а-яa-z\sё]+$/i;
    if (regex.test(element.value) === false && element.classList.contains('popup__input_type_url') === false && element.value.length > 1) {
        element.setCustomValidity(element.dataset.errorMessage);
        buttonState(inputList, buttonElement);
    } else {
        element.setCustomValidity('');
        buttonState(inputList, buttonElement);
    }
    if (element.validity.valid === false) {
        showError(element, element.validationMessage);
        buttonState(inputList, buttonElement);
    } else {
        hideError(element);
        buttonState(inputList, buttonElement);
    }
};

function setEventListeners(element) {
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    const buttonElement = element.querySelector('.popup__button');
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, buttonElement, inputList);
        });
})
};

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(function(formElement) {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

export function clearValidation(element) {
    const inputFormList = element.querySelectorAll('.popup__input');
    inputFormList.forEach(function(inputElement) {
        const formError = element.querySelector(`.${inputElement.id}-error`);
        formError.classList.remove('popup__input_error');
        formError.textContent = '';
    });
    const buttonElement = element.querySelector('.popup__button'); 
    console.log(element);
    buttonElement.classList.remove('popup__button_disabled');
}