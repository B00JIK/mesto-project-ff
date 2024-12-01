

export function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
    element.removeEventListener('click', closePopupOverlay);
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

export function openPopup(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
    element.addEventListener('click', closePopupOverlay);
  };



