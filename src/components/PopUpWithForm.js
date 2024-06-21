import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, config) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._config = config;
    this._form = this._popup.querySelector(this._config.formSelector);
    this.inputValues = document.querySelectorAll(this._config.inputSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    this.inputValues = {};
    this.inputValues.forEach((input) => {
      this.inputValues[input.name] = input.values;
    });
    return this.inputValues;
  }

  setInputValues(data) {
    this.inputValues.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
