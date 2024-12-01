export function userInfo() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
        method: 'GET',
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101'
        }
    })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function usersCardsList() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
            method: 'GET'
        }
    })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function editProfile(name, about) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(function(res) {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function addCard(name, link) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards ', {
        method: 'POST',
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
          })
    })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function deleteCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
            'Content-Type': 'application/json'
        }
    })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function likeCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
            'Content-Type': 'application/json'
        }
    })

        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function deleteLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
            'Content-Type': 'application/json'
        }
    })

        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export function editProfileImage(avatarLink) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink
        })
    })

        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}