const config = {
    urlElement: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
        authorization: '1df3e0b5-5f50-4a81-8676-1c3377736101',
          'Content-Type': 'application/json'
    }
}

export function userInfo() {
    return fetch(`${config.urlElement}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(function(res) {
            return checkResponse(res);
        })
}

export function usersCardsList() {
    return fetch(`${config.urlElement}/cards`, {
        headers: config.headers
    })
        .then(function(res) {
            return checkResponse(res);
        })
}

export function editProfile(name, about) {
    return fetch(`${config.urlElement}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(function(res) {
            return checkResponse(res);
        })
}

export function addCard(name, link) {
    return fetch(`${config.urlElement}/cards `, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
          })
    })
        .then(function(res) {
            return checkResponse(res);
        })
}

export function deleteCard(cardId) {
    return fetch(`${config.urlElement}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(function(res) {
            return checkResponse(res);
        })
}

export function likeCard(cardId) {
    return fetch(`${config.urlElement}/cards//likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })

        .then(function(res) {
            return checkResponse(res);
        })
}

export function deleteLike(cardId) {
    return fetch(`${config.urlElement}/cards//likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })

        .then(function(res) {
            return checkResponse(res);
        })
}

export function editProfileImage(avatarLink) {
    return fetch(`${config.urlElement}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })

        .then(function(res) {
            return checkResponse(res);
        })
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 