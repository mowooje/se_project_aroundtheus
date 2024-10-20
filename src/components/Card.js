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
    this._cardElement = null;
    this.isLiked = data.isLiked || false;
    this.id = data._id;
  }

  _setEventListeners() {
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
    }

    if (cardImage) {
      cardImage.addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
    }

    if (likeButton) {
      likeButton.addEventListener("click", () => {
        this._handleLike(this);
      });
    }
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._handleLikeIcon();
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

    if (this.isLiked) {
      this._handleLikeIcon();
    }
    return this._cardElement;
  }
}
