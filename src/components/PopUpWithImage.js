import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popUpElement.querySelector(".modal__preview-image");
    this._caption = this._popUpElement.querySelector(
      ".modal__preview-description"
    );
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}
