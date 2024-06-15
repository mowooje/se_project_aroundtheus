import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants";
import PopupWithImage from "../components/PopupWithImage.js";

/* Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
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

/* ------------------------------------------------------------------------------- */

/* Preview Elements */
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);

const cardSelector = "#card-template";

/* ------------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

/* ------------------------------------------------------------------------------- */

/* Functions */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

addCardButton.addEventListener("click", () => {
  addModal.open();
});

/* ------------------------------------------------------------------------------- */

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});
// add new card

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const editModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  config
);

const addModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit,
  config
);

editModal.setEventListeners();
addModal.setEventListeners();

function handleProfileEditSubmit(_inputValues) {
  profileTitle.textContent;
  profileDescription.textContent;
  closeModal(profileEditModal);
}

function handleImageClick(name, link) {
  previewCardModal.open(name, link);
}

const previewCardModal = new PopupWithImage("#modal-preview");
previewCardModal.setEventListeners();

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(cardData) {
  const addCard = new Card(cardData, cardSelector, handleImageClick);
  return addCard.getView();
}

function handleAddCardSubmit(_inputValues) {
  event.preventDefault();

  const formData = new FormData(_inputValues);
  const name = formData.get("name");
  const link = formData.get("link");

  renderCard({ name, link });
  addModal.close();
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
