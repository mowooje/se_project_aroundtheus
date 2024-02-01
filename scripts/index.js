const initialCards = [
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

/* Elements */
const profileEditButton = document.querySelector("#profile__edit-button");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-title");
const profileEditForm = document.querySelector("#profile-edit-form");
const profileDescription = document.querySelector("#profile-description");
const editProfileModalName = document.querySelector(
  "#edit-profile-modal-title"
);
const editProfileModalDescription = document.querySelector(
  "#edit-profile-modal-description"
);
const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#cards-template").content.firstElementChild;

/* Functions */
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileModalName.value;
  profileDescription.textContent = editProfileModalDescription.value;
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector("#card-title");
  const cardImageEl = cardElement.querySelector("#card-image");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

/* Event Listensers */
editProfileButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  editProfileModalName.value = profileName.textContent;
  editProfileModalDescription.value = profileDescription.textContent.trim();
});

profileEditForm.addEventListener("submit", editProfileFormSubmit);

modalCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

/* Lopps */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
