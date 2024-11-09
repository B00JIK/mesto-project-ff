import './index.css';
import {initialCards} from './cards.js';
import {closePopup, openPopup, handleFormSubmit} from './components/modal.js';
import { createCard, addNewCard} from './components/cardFunctions.js';

const cardPlaces = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileEdit = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const popup = document.querySelectorAll('.popup');
const formElementProfile = document.forms['edit-profile'];
const formElementPlace = document.forms['new-place'];

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const cardElement = createCard(element.name, element.link);
  cardPlaces.append(cardElement);
});

closeButtons.forEach(function(element) {
  element.addEventListener('click', function() {
      popup.forEach(function(element) {
        closePopup(element);
      });
  });
});

addButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

profileEdit.addEventListener('click', function() {
  openPopup(editProfilePopup);
});

formElementProfile.addEventListener('submit', handleFormSubmit); 

formElementPlace.addEventListener('submit', addNewCard);

