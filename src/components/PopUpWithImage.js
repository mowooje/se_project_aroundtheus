import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popUpElement.querySelector(".modal__preview-image");
    this._caption = this._popUpElement.querySelector(
      ".modal__preview-description"
    );
  }

  open(data) {
    this._image = this._popUpElement.querySelector(".modal__preview-image");
    this._caption = this._popUpElement.querySelector(
      ".modal__preview-description"
    );

    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}
