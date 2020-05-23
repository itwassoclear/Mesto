class UserInfo {
  constructor(form, userName, userData, avatar, api) {
    this.form = form;
    this.userName = userName;
    this.userData = userData;
    this.avatar = avatar;
    this.api = api;
    this.id = null;
  }
  
  // Меняет информацию на самой странице
  userInfoLoad() {
    this.api.getUserInfo()
    .then(data => {
    const {name, about, avatar, _id} = data; // name и about не используются. Можно убрать
    this.id = _id;
    this.userName.textContent= data.name;
    this.userData.textContent= data.about;
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  // Вставляет информацию со страницы в поля ввода
  setUserInfo() {
    this.form.username.value = this.userName.textContent;
    this.form.about.value = this.userData.textContent;
  }

  // Обновляет
  updateUserInfo(data) {
    this.userName.textContent = data.name;
    this.userData.textContent = data.about;
  }

  updateUserAvatar() {
    this.elem.innerHTML = `<img src="${avatar}" class="user-info__avatar">`
    // this.avatar.style.backgroundImage = `url(${data.avatar})`;
  }

  // Получаем айдишник пользователя
  getId () {
    return this.id;
  }
}