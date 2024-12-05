
function buttonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList) === true) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', '');
    }
};

function showError(element, errorMessage, config) {
    const formError = document.querySelector(`.${element.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(config.inputErrorClass);
};

function hideError(element, config) {
    const formError = document.querySelector(`.${element.id}-error`);
    formError.classList.remove(config.inputErrorClass);
    formError.textContent = '';
};

function hasInvalidInput(element) {
    return element.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
};

function checkInputValidity(element, buttonElement, inputList, config) {
    if (element.validity.patternMismatch === true) {
        element.setCustomValidity(element.dataset.errorMessage);
        buttonState(inputList, buttonElement, config);
        element.classList.add(config.errorClass);
    } else {
        element.setCustomValidity('');
        element.classList.remove(config.errorClass);
        buttonState(inputList, buttonElement, config);
    }
    if (element.validity.valid === false) {
        element.classList.add(config.errorClass);
        showError(element, element.validationMessage, config);
        buttonState(inputList, buttonElement, config);
    } else {
        hideError(element, config);
        element.classList.remove(config.errorClass);
        buttonState(inputList, buttonElement, config);
    }
};

function setEventListeners(element, config) {
    const inputList = Array.from(element.querySelectorAll(config.inputSelector));
    const buttonElement = element.querySelector(config.submitButtonSelector);
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, buttonElement, inputList, config);
        });
})
};

export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(function(formElement) {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};

export function clearValidation(element, config) {
    const inputFormList = element.querySelectorAll(config.inputSelector);
    inputFormList.forEach(function(inputElement) {
        const formError = element.querySelector(`.${inputElement.id}-error`);
        formError.classList.remove(config.inputErrorClass);
        inputElement.classList.remove(config.errorClass);
        formError.textContent = '';
    });

    if (element.classList.contains('popup_type_edit') === true) {
        const buttonElement = element.querySelector(config.submitButtonSelector); 
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}