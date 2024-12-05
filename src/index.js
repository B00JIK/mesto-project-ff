import './index.css';
import {initialCards} from './components/cards.js';
import {closePopup, openPopup} from './components/modal.js';
import { createCard, like, deleteMyCard} from './components/cardFunctions.js';
import { clearValidation, enableValidation} from './components/validation.js';
import { userInfo, usersCardsList, editProfile, addCard, editProfileImage} from './components/api.js';

export const cardPlaces = document.querySelector('.places__list');
export const placeInput = document.querySelector('.popup__input_type_card-name');
export const linkInput = document.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileEdit = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarEditPopup = document.querySelector('.popup_type_new-avatar');
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
const avatarEdit = document.querySelector('.profile__image-edit-button');
const formElementAvatar = document.forms['new-avatar'];
const editAvatarFormInput = formElementAvatar.elements.link;
const profileImage = document.querySelector('.profile__image');
let myId = '';
const configSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_invalid',
  editPopupClass: 'popup_type_edit'
}


export function openImg(evt) {
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
  const saveButton = formElementPlace.querySelector(configSelector.submitButtonSelector);
  saveButton.textContent = 'Сохранение...';
  addCard(placeValue, linkValue)
    .then(function(newCardData) {
      const newCard = createCard(newCardData, openImg, myId, like, deleteMyCard);
      cardPlaces.prepend(newCard);
      formElementPlace.reset();
      closePopup(newCardPopup);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      saveButton.textContent = 'Сохранить';
    })
}

function profileEditForm(evt) {
  evt.preventDefault();
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;
  const saveButton = formElementProfile.querySelector(configSelector.submitButtonSelector);
  saveButton.textContent = 'Сохранение...';
  editProfile(nameValue, jobValue) 
    .then(function() {
      pageName.textContent = nameValue;
      pageDescription.textContent = jobValue;
      closePopup(editProfilePopup);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      saveButton.textContent = 'Сохранить';
    })
}

function avatarEditForm(evt) {
  evt.preventDefault();
  const saveButton = formElementAvatar.querySelector(configSelector.submitButtonSelector);
  saveButton.textContent = 'Сохранение...';
  editProfileImage(editAvatarFormInput.value)
    .then(function(data) {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarEditPopup);
      editAvatarFormInput.value = '';
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      saveButton.textContent = 'Сохранить';
    })
}

closeButtons.forEach(function(element) {
  element.addEventListener('click', function() {  
      const popupOpened = element.closest('.popup_is-opened');
      closePopup(popupOpened);
  });
});

addButton.addEventListener('click', function() {
  const buttonElement = newCardPopup.querySelector(configSelector.submitButtonSelector);
  buttonElement.classList.add(configSelector.inactiveButtonClass);
  openPopup(newCardPopup);
  clearValidation(newCardPopup, configSelector);
});

avatarEdit.addEventListener('click', function() {
  const buttonElement = avatarEditPopup.querySelector(configSelector.submitButtonSelector);
  buttonElement.classList.add(configSelector.inactiveButtonClass);
  openPopup(avatarEditPopup);
  clearValidation(avatarEditPopup, configSelector);
});

profileEdit.addEventListener('click', function() {
  nameInput.value = pageName.textContent;
  jobInput.value = pageDescription.textContent;
  openPopup(editProfilePopup);
  clearValidation(editProfilePopup, configSelector);
});

formElementProfile.addEventListener('submit', profileEditForm);
formElementPlace.addEventListener('submit', addNewCard);
formElementAvatar.addEventListener('submit', avatarEditForm);

enableValidation(configSelector);

const promisList = [userInfo(), usersCardsList()];

Promise.all(promisList)
  .then(function([userInfo, usersCardsList]) {
    pageName.textContent = userInfo.name;
    pageDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    myId = userInfo['_id'];

    usersCardsList.forEach(function(element) {
      const cardElement = createCard(element, openImg, myId, like, deleteMyCard);
      cardPlaces.append(cardElement);
    })
  })
  .catch(function(err) {
    console.log(err);
    })

