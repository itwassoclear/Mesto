class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Запрашиваем информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  // Обновляем информацию
  updateUserInfoApi(name, about, avatar) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // // Обновление аватара
  // updateUserAvatarApi(avatar) {
  //   return fetch(`${this.baseUrl}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       avatar: avatar
  //     })
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  // }

  // Запрашиваем карточки
  getInitialCards() {
    return fetch(this.baseUrl + `/cards`, {
      method: 'GET',
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Добавляем новую карточку на сервер
  addNewCard(name, link) {
    return fetch(this.baseUrl + `/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Удаляем карточку
  deleteCard(id) {
    return fetch(this.baseUrl + `/cards/` + id, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}