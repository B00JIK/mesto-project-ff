import './index.css';
import {initialCards} from './components/cards.js';
import {closePopup, openPopup} from './components/modal.js';
import { createCard} from './components/cardFunctions.js';
import { clearValidation, enableValidation } from './components/validation.js';
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
  const saveButton = formElementPlace.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  const myId = userInfo()
    .then(function(data) {
      return data['_id'];
    })
    .catch(function(err) {
      console.log(err);
    })
  addCard(placeValue, linkValue)
    .then(function(newCardData) {
      const newCard = createCard(newCardData, openImg, myId);
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
  const saveButton = formElementProfile.querySelector('.popup__button');
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
  const saveButton = formElementAvatar.querySelector('.popup__button');
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
      if (element.classList.contains('popup__button')) {
        clearValidation(popupOpened);
      }
  });
});

addButton.addEventListener('click', function() {
  formElementPlace.setAttribute('novalidate', '');
  openPopup(newCardPopup);
});

avatarEdit.addEventListener('click', function() {
  formElementPlace.setAttribute('novalidate', '');
  openPopup(avatarEditPopup);
});

profileEdit.addEventListener('click', function() {
  formElementProfile.setAttribute('novalidate', '');
  nameInput.value = pageName.textContent;
  jobInput.value = pageDescription.textContent;
  openPopup(editProfilePopup);
});

formElementProfile.addEventListener('submit', profileEditForm); 
formElementPlace.addEventListener('submit', addNewCard);
formElementAvatar.addEventListener('submit', avatarEditForm);

enableValidation();

const promisList = [userInfo(), usersCardsList()];

Promise.all(promisList)
  .then(function([userInfo, usersCardsList]) {
    pageName.textContent = userInfo.name;
    pageDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    myId = userInfo['_id'];

    usersCardsList.forEach(function(element) {
      const cardElement = createCard(element, openImg, myId);
      cardPlaces.append(cardElement);
    });
  });


