import './index.css';
import {initialCards} from './components/cards.js';
import {closePopup, openPopup} from './components/modal.js';
import { createCard} from './components/cardFunctions.js';

export const cardPlaces = document.querySelector('.places__list');
export const placeInput = document.querySelector('.popup__input_type_card-name');
export const linkInput = document.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileEdit = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const formElementProfile = document.forms['edit-profile'];
const formElementPlace = document.forms['new-place'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const imagePopupClass = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const pageName = document.querySelector('.profile__title');
const pageDescription = document.querySelector('.profile__description');


function openImg(evt) {
  popupImageCaption.textContent = evt.target.alt;
  imagePopupClass.src = evt.target.src;
  imagePopupClass.alt = evt.target.alt;
  if (evt.target.classList.contains('card__image')) {
    openPopup(imagePopup);
  };
};

function addNewCard(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const newCard = createCard(placeValue, linkValue);
  cardPlaces.prepend(newCard);
  placeInput.value = '';
  linkInput.value = '';
  closePopup(newCardPopup);
}

function profileEditForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  pageName.textContent = nameValue;
  pageDescription.textContent = jobValue;
  closePopup(editProfilePopup);
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const cardElement = createCard(element.name, element.link, openImg);
  cardPlaces.append(cardElement);
});

closeButtons.forEach(function(element) {
  element.addEventListener('click', function() {  
      const popupOpened = element.closest('.popup_is-opened');
      closePopup(popupOpened);
  });
});

addButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

profileEdit.addEventListener('click', function() {
  nameInput.value = pageName.textContent;
  jobInput.value = pageDescription.textContent;
  openPopup(editProfilePopup);
});

formElementProfile.addEventListener('submit', profileEditForm); 

formElementPlace.addEventListener('submit', addNewCard);

