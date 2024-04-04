export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector("#card__like_button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector("#card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector("#card__iamge")
      .addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector("#card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageEl = this._cardElement.querySelector("#card-image");
    const cardTitleEl = this._cardElement.querySelector("#card-title");
    cardImageEl.src = this._data.link;
    cardImageEl.alt = this._data.name;
    cardTitleEl.textContent = this._data.name;
    this._setEventListeners();
    return this._cardElement;
  }
}
