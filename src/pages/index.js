import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants";
import PopUpWithImage from "../components/PopUpWithImage.js";

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

/* Add Buttons */
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector(".modal__card-form");
const addNewCardModal = document.querySelector("#add-card-modal");

/* Preview Elements */
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);

const cardSelector = "#card-template";

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

/* Functions */
addCardButton.addEventListener("click", () => {
  addModal.open();
});

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = userInfo.getUserInfo().title;
  profileDescriptionInput.value = userInfo.getUserInfo().description;
  editModal.open();
});

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

function handleProfileEditSubmit(inputValues) {
  fakeServerRequest(inputValues)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      editModal.close();
      profileEditFormValidator.disableButton();
      profileEditForm.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleImageClick(name, link) {
  previewCardModal.open(name, link);
}

const previewCardModal = new PopUpWithImage("#modal-preview");
previewCardModal.setEventListeners();

function handleLike(cardInstance) {
  cardInstance.setIsLiked(!cardInstance.isLiked);
}

function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return cardElement.getView();
}

function renderCard(cardData) {
  const cardEl = createCard(cardData);
  cardSection.addItem(cardEl);
}

function handleAddCardSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.link;

  fakeServerRequest(inputValues)
    .then(() => {
      const cardEl = createCard({ name, link });
      cardSection.addItem(cardEl);
      addModal.close();
      addCardFormValidator.disableButton();
      addModal.resetForm();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteCard(cardInstance) {
  cardInstance.handleDeleteButton();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
cardSection.renderItems();

function fakeServerRequest(inputValues) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });
}
