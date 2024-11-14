import { cardPlaces, placeInput, linkInput } from "..";
import { closePopup } from "./modal";
export function createCard(placeName, placeLink, callback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', placeLink);
    cardElement.querySelector('.card__image').setAttribute('alt', placeName);
  
    cardElement.querySelector('.card__title').textContent = placeName;
  
    cardElement.querySelector('.card__like-button').addEventListener('click', like);

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () { 
      deleteCallback(cardElement); 
    });

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.addEventListener('click', callback);
  
    return cardElement;
  };

  export function like(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }

  export function deleteCallback(cardElement) {
    cardElement.remove(); 
  };

