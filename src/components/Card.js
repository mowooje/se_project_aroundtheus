export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
  }

  _setEventListeners() {
    // Ensure that _cardElement is properly initialized before accessing its properties
    if (!this._cardElement) {
      console.error("Card element is not initialized.");
      return;
    }

    const deleteButton = this._cardElement.querySelector("#card__trash-button");
    const cardImage = this._cardElement.querySelector("#card-image");
    const likeButton = this._cardElement.querySelector("#card__like-button");

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    } else {
      console.error("Delete button not found in the card element.");
    }

    if (cardImage) {
      cardImage.addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
    } else {
      console.error("Card image not found in the card element.");
    }

    if (likeButton) {
      likeButton.addEventListener("click", () => {
        this._handleLike(this);
      });
    } else {
      console.error("Like button not found in the card element.");
    }
  }

  handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector("#card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    const cardTemplate = document.querySelector(this._cardSelector);
    if (!cardTemplate) {
      console.error(`Card template selector ${this._cardSelector} not found.`);
      return null;
    }

    this._cardElement = cardTemplate.content
      .querySelector(".card")
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
