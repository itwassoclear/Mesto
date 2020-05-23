class Card {
  constructor(name, link, id, isMine, api) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.isMine = isMine;
    this.api = api;
    this.elem = null;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  // Запрос на сервер отправляется только если условие выполнено
  remove() {
    if (window.confirm("Do you really want to delete?")) {
      this.api
      .deleteCard(this.id)
      .then(() => {
          this.elem.remove();
      })
      .catch((err) => {
        console.log(err); 
      });
    }
  }

  // Создание новой карточки
  create() {
    this.elem = document.createElement('div');
    this.elem.classList.add('place-card');

    const template = `<div class="place-card"> 
      <div class="place-card__image" style="background: url(${this.link});background-size: cover;">
      
      ${this.isMine ?
      '<button class="place-card__delete-icon"></button>' : ''}

      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${this.name}</h3>
        
        <button class="place-card__like-icon"></button>
      </div>
    </div>`;

    this.elem.innerHTML = template;

    const deleteButton = this.elem.querySelector('.place-card__delete-icon');

    if (deleteButton) {
      deleteButton.addEventListener('click', this.remove.bind(this))
      }

    this.elem.querySelector('.place-card__like-icon').addEventListener('click', this.like);

    return this.elem;
  }
}