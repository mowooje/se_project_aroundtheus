import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, config) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._config = config;
    this._form = this._popup.querySelector(this._config.formSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (inputValues) =>
      this._handleFormSubmit(inputValues)
    );
  }

  _getInputValues() {
    this.inputValues = {};
    this.inputEl.forEach((input) => {
      this.inputValues[input.name] = input.values;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputEl.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
