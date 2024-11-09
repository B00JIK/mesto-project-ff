import { openImg } from "./modal";

export function createCard(placeName, placeLink) {
    const cardPlaces = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', placeLink);
    cardElement.querySelector('.card__image').setAttribute('alt', placeName);
  
    cardElement.querySelector('.card__title').textContent = placeName;
  
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
      like();
    });

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () { 
      deleteCallback(cardElement); 
    });

    cardPlaces.addEventListener('click', openImg);
  
    return cardElement;
  };

  export function like(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }

  export function deleteCallback(cardElement) {
    cardElement.remove(); 
  };

export function addNewCard(evt) {
    evt.preventDefault();
    const cardPlaces = document.querySelector('.places__list');
    const placeInput = document.querySelector('.popup__input_type_card-name');
    const linkInput = document.querySelector('.popup__input_type_url');
    const placeValue = placeInput.value;
    const linkValue = linkInput.value;
    const newCard = createCard(placeValue, linkValue);
    cardPlaces.prepend(newCard);
    placeInput.value = '';
    linkInput.value = '';
  }