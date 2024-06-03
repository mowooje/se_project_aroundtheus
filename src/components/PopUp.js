export default class PopUp {
  constructor({ popUpSelector }) {
    this._popUpElement = document.querySelector(popUpSelector);
    this._closeButton = this._popUpElement.querySelector(".modal__close");
    this.close = this.close.bind(this);
  }

  open() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeKey);
    document.addEventListener("mousedown", this._handleOutsideClick);
  }

  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeKey);
    document.removeEventListener("mousedown", this._handleOutsideClick);
  }

  _handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
