import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super({ popUpSelector });
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEl = this._popUpElement.querySelectorAll(".modal__input");
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popUpForm.reset();
      this.close();
    });
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputEl.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputEl.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
