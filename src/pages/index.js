import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/constant.js";
import PopUpWithImage from "../components/PopUpWithImage.js";

/* Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

/* ------------------------------------------------------------------------------- */

/* Add Buttons */
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector(".modal__card-form");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addNewCardModal.querySelector(
  "#card-modal-close-button"
);

/* ------------------------------------------------------------------------------- */

/* Preview Elements */
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);
/* const previewCloseButton = previewCardModal.querySelector("button"); */

const cardSelector = "#card-template";

/* ------------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  profileTitle: ".modal__input_type_title",
  profileDescription: ".modal__input_type_description",
});

/* ------------------------------------------------------------------------------- */

/* Functions */
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardButton.addEventListener("click", () => openModal(addNewCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

/* ------------------------------------------------------------------------------- */

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

// add new card

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form_input_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const editModal = new PopUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  config
);

const addModal = new PopUpWithForm(
  "#add-card-modal",
  handleAddCardSubmit,
  config
);

editModal.setEventListeners();
addModal.setEventListeners();

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closeModal(profileEditModal);
}

function handleImageClick(cardData) {
  previewImage.src = cardData.link;
  previewImage.setAttribute("alt", cardData.name);
  previewDescription.textContent = cardData.name;
  openModal(document.querySelector("#modal-preview"));
}

const previewCardModal = new PopUpWithImage("#modal-preview");
previewCardModal.setEventListeners();

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(cardData) {
  const cardView = createCard(cardData);
  cardListEl.prepend(cardView);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function handleAddCardSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const name = formData.get("name");
  const link = formData.get("link");

  const card = createCard({ name, link });
  cardListEl.prepend(card);

  closeModal(addNewCardModal);
  addCardForm.reset();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
cardSection.renderItems();

/* ------------------------------------------------------------------------------- */

/* Popup Escape */

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addNewCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
document
  .querySelector("#modal-preview")
  .addEventListener("mousedown", closeModalOnRemoteClick);
