import {deleteCard, likeCard, deleteLike} from './api';

export function createCard(cardData, callback, myId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeSection = cardElement.querySelector('.card-like-count');
    const likeCount = cardElement.querySelector('.card-like-count');
    cardElement.querySelector('.card__image').setAttribute('src', cardData.link);
    cardElement.querySelector('.card__image').setAttribute('alt', cardData.name);
    cardElement.querySelector('.card__title').textContent = cardData.name;

    likeSection.textContent = cardData.likes.length;

    cardData.likes.forEach(function(user) {
      if (user._id === myId){
        cardLikeButton.classList.add('card__like-button_is-active');
      }
    })
    cardLikeButton.addEventListener('click', function(evt) {
      like(evt, cardLikeButton, cardData['_id'], likeCount)
    });


    if (myId === cardData.owner['_id']) {
      deleteButton.addEventListener('click', function () { 
        deleteCallback(cardElement, cardData['_id']); 
      });
    } else {
      deleteButton.classList.add('card__delete-button-inactive');
    }

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.addEventListener('click', callback);
  
    return cardElement;
  };

  export function like(evt, cardLikeButton, id, likeCount) {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      deleteLike(id)
        .then(function(cardData) {
          evt.target.classList.toggle('card__like-button_is-active');
          likeCount.textContent = cardData.likes.length;
        })
    } else {
      likeCard(id)
        .then(function(cardData) {
          evt.target.classList.toggle('card__like-button_is-active');
          likeCount.textContent = cardData.likes.length;
        })
    }
  }

  export function deleteCallback(cardElement, cardId) {
    deleteCard(cardId);
    cardElement.remove(); 
  };

