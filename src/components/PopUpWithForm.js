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
    this._form.addEventListener("submit", (_inputValues) =>
      this._handleFormSubmit(_inputValues)
    );
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
