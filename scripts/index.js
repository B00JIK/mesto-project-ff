const cardPlaces = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__button')
const newCardPopup = document.querySelector('.popup_type_new-card');

const cardTemplate = document.querySelector('#card-template').content;

function addCard(placeName, placeLink) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', placeLink);
    cardElement.querySelector('.card__image').setAttribute('alt', placeName);
  
    cardElement.querySelector('.card__title').textContent = placeName;
  
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_is-active');
    });

    deleteCard(cardElement);

    return cardElement;
  }

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        cardElement.remove();
    });
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
    const cardElement = addCard(element.name, element.link);
    cardPlaces.append(cardElement);
});