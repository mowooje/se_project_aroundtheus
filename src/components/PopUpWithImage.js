import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector: popupSelector });
  }

  open(data) {
    this._image = this._popupElement.querySelector(".modal__preview-image"); // Corrected
    this._caption = this._popupElement.querySelector(
      ".modal__preview-description"
    );

    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}
