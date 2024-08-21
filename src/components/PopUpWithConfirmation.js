import PopUp from "./PopUp";

export default class PopUpWithConfirmation extends PopUp {
  constructor(popUpSelector) {
    super({ popUpSelector });
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._submitButton = this._popUpForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.addEventListeners();
  }
}
