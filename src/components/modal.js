export function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);
};

export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    };
};

export function closePopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target);
      };
};

export function openPopup(popupClass) {
    popupClass.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
    popupClass.addEventListener('click', closePopupOverlay);
  };

export function openImg(evt) {
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupClass = document.querySelector('.popup__image');
    const popupText = document.querySelector('.popup__caption');
    popupText.textContent = evt.target.alt;
    imagePopupClass.src = evt.target.src;
    imagePopupClass.alt = evt.target.alt;
    if (evt.target.classList.contains('card__image')) {
      openPopup(imagePopup);
    };
  };

export function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const pageName = document.querySelector('.profile__title');
    const pageDescription = document.querySelector('.profile__description');
    pageName.textContent = nameValue;
    pageDescription.textContent = jobValue;
  }

