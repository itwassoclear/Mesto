export class UserInfo {
  constructor(form, userName, userData, userPhoto, api, avatar) {
    this.form = form;
    this.userName = userName;
    this.userData = userData;
    this.userPhoto = userPhoto;
    this.api = api;
    this.avatar = avatar;
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
    this.userPhoto.style = `background: url(${data.avatar}); background-size: cover`;
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

  updateUserAvatar(data) {
    this.userPhoto.style = `background: url(${data.avatar}); background-size: cover`;
  }

  // Получаем айдишник пользователя
  getId () {
    return this.id;
  }
}