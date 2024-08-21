export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form_input_error",
  errorClass: "modal__error_visible",
};

/* Profile Elements */
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector(
  ".profile__title-input"
);
export const profileDescriptionInput = document.querySelector(
  ".profile__description-input"
);

/* Add Card */
export const profileAddButton = document.querySelector(".profile__add-button");
export const addCardForm = document.querySelector("#modal-name-form");
export const addNewCardModal = document.querySelector("#add-card-modal");
export const addCardSubmit = addNewCardModal.querySelector(".modal__button");

/* Preview Elements */
export const previewImage = document.querySelector(".modal__preview-image");
export const previewDescription = document.querySelector(
  ".modal__preview-description"
);

/* Avatar Elements */
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);
export const profileAvatarModal = document.querySelector("#avatar-modal");
export const profileAvatarForm = document.querySelector(
  ".profile__avatar-form"
);

/* Delete Elements */
export const cardDeleteButton = document.querySelector(".card__trash-button");
export const cardDeleteModal = document.querySelector("#delete-modal");
export const cardDeleteForm = cardDeleteModal.querySelector(".modal__form");

let profileEditButton;
let profileEditForm;

document.addEventListener("DOMContentLoaded", () => {
  profileEditForm = document.querySelector("#profile-edit-form");
  profileEditButton = document.querySelector(".profile__edit-button");

  if (profileEditButton) {
    profileEditButton.addEventListener("click", handleEditButtonClick);
  }
});
