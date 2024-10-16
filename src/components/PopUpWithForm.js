import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popupSelector, handleFormSubmit, config) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._config = config;
    this._form = this._popup.querySelector(this._config.formSelector);
    this.inputEl = this._popup.querySelectorAll(".modal__input");
    this.inputValues = {};
    this._submitButton = this._popup.querySelector(".modal__button");
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues())
          .then(() => {
            this._form.reset();
            this.close();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      console.error("Form not found");
    }
  }

  _getInputValues() {
    this.inputValues = {};
    this.inputEl.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }

  setInputValues(data) {
    this.inputValues.forEach((input) => {
      input.value = data[input.name];
    });

    {
      this._popup.querySelector(".modal__form").reset();
      super.close();
    }
  }
}
