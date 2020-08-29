import "./index.css";
import { Api } from "./scripts/Api.js";
import { Card } from "./scripts/Card.js";
import { CardList } from "./scripts/CardList.js";
import { Popup } from "./scripts/Popup.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { FormValidator } from "./scripts/FormValidator.js";

const cardArea = document.querySelector(".places-list"); // Контейнер, где лежат карточки
const popupFormEdit = document.querySelector(".popup__form_edit"); // Форма редактировать профиль
const form = document.forms.new; // Форма Новое место
const formEdit = document.forms.edit; // Форма Редактировать профиль
const userPhoto = document.querySelector(".user-info__photo"); // Фотография юзера
const formAvatar = document.forms.avatar; // Форма Редактировать аватар
const popupOpenAdd = document.querySelector(".popup-add"); // Попап добавления карточек
const popupOpenEdit = document.querySelector(".popup-edit"); // Попап редактирования профиля
const popupImage = document.querySelector(".popup-image"); // Попап открытия картинки
const popupAvatar = document.querySelector(".popup-avatar"); // Попап редактирования аватара
const popupClose = document.querySelector(".popup__close"); // Кнопка закрытия попапа
const popupCloseEdit = document.querySelector(".popup__close_edit"); // Кнопка закрытия попапа редактирования профиля
const userInfoButton = document.querySelector(".user-info__button"); // Кнопка открытия попапа добавления карточек
const userInfoButtonEdit = document.querySelector(".user-info__button-edit"); // Кнопка открытия попапа редактирования профиля
const userInfoName = document.querySelector(".user-info__name"); // Сохранённое Имя
const userInfoJob = document.querySelector(".user-info__job"); // Сохранённое О себе
const serverUrl =
  NODE_ENV === "development"
    ? "http://nomoreparties.co/cohort10"
    : "https://nomoreparties.co/cohort10";

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: "21742853-5451-43fe-a816-3296501b9770",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  popupFormEdit,
  userInfoName,
  userInfoJob,
  userPhoto,
  api,
  avatar
);
userInfo.userInfoLoad();

const createCard = (name, link, id, isMine) =>
  new Card(name, link, id, isMine, api);

const cardList = new CardList(
  document.querySelector(".places-list"),
  createCard,
  api,
  userInfo
);
cardList.render();

const popup = new Popup(popupOpenAdd);
const popupEdit = new Popup(popupOpenEdit);
const popupImg = new Popup(popupImage);
const popupAvtr = new Popup(popupAvatar);

const formValidatorAdd = new FormValidator(form);
const formValidatorEdit = new FormValidator(formEdit);
const formValidatorAvatar = new FormValidator(formAvatar);

formValidatorAdd.setEventListeners();
formValidatorEdit.setEventListeners();
formValidatorAvatar.setEventListeners();

// Функция сброса ошибок
function clearErrors() {
  const errors = Array.from(document.querySelectorAll(".popup__error-message"));
  errors.forEach((el) => (el.textContent = ""));
}

// Функция сброса кнопки submit
function buttonDisabled() {
  document
    .querySelector('button[type="submit"]')
    .classList.add("popup__button_disabled");
  document
    .querySelector('button[type="submit"]')
    .setAttribute("disabled", true);
}

// Функция открытия и закрытия попапа с картинкой
function onCardClick(event) {
  if (event.target.classList.contains("place-card__image")) {
    popupImg.open();
    popupImage.innerHTML =
      '<div class="popup__content_image"> <img class="popup__img-zoom" alt="Изображение места" src=' +
      event.target.style.backgroundImage.slice(4, -1) +
      '> <img src="./img/close.svg" alt="close" class="popup__close_image"></div>';
  }

  const popupCloseImage = document.querySelector(".popup__close_image");
  popupCloseImage.addEventListener("click", function (event) {
    popupImg.close();
  });
}

// Функция открытия попапа обновления аватара
function editAvatar(event) {
  if (event.target.classList.contains("user-info__photo")) {
    popupAvtr.open();
  }

  const popupCloseAvatar = document.querySelector(".popup__close_avatar");
  popupCloseAvatar.addEventListener("click", function (event) {
    popupAvtr.close();
  });
}

// Открытие окна добавления карточки
userInfoButton.addEventListener("click", (event) => {
  popup.open();
  buttonDisabled();
});

// Добавление новой карточки
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.querySelector(".popup__input_type_name").value;
  const link = event.target.querySelector(".popup__input_type_link-url").value;

  api
    .addNewCard(name, link)
    .then((data) => {
      let newCard = cardList.makeCard(
        data.name,
        data.link,
        data._id,
        data.owner._id,
        data.isMine
      );
      cardList.addCard(newCard);
    })
    .catch((err) => {
      console.log(err);
    });

  popup.close();
  form.reset();
});

// Закрытие попапа Новое место
popupClose.addEventListener("click", (event) => {
  popup.close();
  clearErrors();
  buttonDisabled();
});

// Открытие окна редактирования профиля
userInfoButtonEdit.addEventListener("click", (event) => {
  userInfo.setUserInfo();
  popupEdit.open();
  buttonDisabled();
});

// Сохранение новой информации о пользователе
popupFormEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidatorEdit.setEventListeners();
  const userName = event.target.querySelector(".popup__input_name").value;
  const userData = event.target.querySelector(".popup__input_about").value;

  api
    .updateUserInfoApi(userName, userData)
    .then((data) => {
      userInfo.updateUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    });
  buttonDisabled();
});

// Закрытие попапа Редактировать профиль
popupCloseEdit.addEventListener("click", (event) => {
  popupEdit.close();
  buttonDisabled();
  clearErrors();
});

// Открытие попапа обновления аватара
userPhoto.addEventListener("click", editAvatar);

// Обновление аватара
formAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidatorAvatar.setEventListeners();

  const avatar = event.target.querySelector(".popup__input_type_link-url")
    .value;
  api
    .updateUserAvatarApi(avatar)
    .then((data) => {
      userInfo.updateUserAvatar(data);
      popupAvtr.close();
      document
        .querySelector(".popup__button-avatar")
        .classList.add("popup__button_disabled");
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    });
  buttonDisabled();
});

cardArea.addEventListener("click", onCardClick);
