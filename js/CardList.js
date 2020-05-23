class CardList {
  constructor(elem, makeCard, api, userInfo) {
    this.elem = elem;
    this.makeCard = makeCard;
    this.api = api;
    this.userInfo = userInfo;
  }

  // Добавление новой карточки
  addCard(card) {
    const cardElem = card.create();
    this.elem.appendChild(cardElem);
  }

  // Рендер всех карточек
  render() {
    this.api
    .getInitialCards()
    .then(cards => {
        cards.forEach(data => {
          const myId = this.userInfo.getId();
          const isMine = data.owner._id === myId;
          const card = this.makeCard(data.name, data.link, data._id, isMine);
          this.addCard(card);
        })
        .catch((err) => {
          console.log(err); 
        });
    })
  }
}