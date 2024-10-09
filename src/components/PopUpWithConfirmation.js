import PopUp from "./PopUp";

export default class PopUpWithConfirmation extends PopUp {
  constructor({ popUpSelector }) {
    const popUpElement = document.querySelector(popUpSelector);
    if (!popUpElement) {
      throw new Error(`Element with selector "${popUpSelector}" not found.`);
    }

    super({ popupSelector: popUpSelector });

    this._popUpForm = popUpElement.querySelector(".modal__form");
    this._submitButton = this._popUpForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = null;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(submit, loadingText = "Deleting...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._handleFormSubmit === "function") {
        this._handleFormSubmit();
      } else {
        console.error("Submit action is not defined or not a function.");
      }
    });
    super.setEventListeners();
  }
}
