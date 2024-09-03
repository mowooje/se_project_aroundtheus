import Api from "../components/Api.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import {
  initialCards,
  config,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  profileEditButton,
  profileEditForm,
  addCardForm,
  addNewCardModal,
  previewImage,
  previewDescription,
  profileAvatarButton,
  profileAvatarModal,
  profileAvatarForm,
  cardDeleteButton,
  cardDeleteModal,
  cardDeleteForm,
} from "../utils/constants";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithConfirmation from "../components/PopUpWithConfirmation.js";

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

const cardSelector = "#card-template";

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  avatarSelector: ".profile__image",
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b0f5599c-4007-4941-89b3-30100c4f8838",
    "Content-Type": "application/json",
  },
});

let section;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, data]) => {
    section = new Section(
      {
        items: cards,
        renderer: (data) => {
          const cardEl = renderCard(data);
          section.addItem(cardEl);
        },
      },
      ".cards__list"
    );
    section.renderItems();

    userInfo.setUserInfo({
      title: data.name,
      description: data.about,
    });

    userInfo.setAvatar({ avatar: data.avatar });
  })
  .catch((err) => {
    console.log(err);
  });

if (profileAddButton) {
  profileAddButton.addEventListener("click", () => {
    addModal.open();
  });
} else {
  console.error("profileAddButton not found in the DOM");
}

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = userInfo.getUserInfo().title;
  profileDescriptionInput.value = userInfo.getUserInfo().description; // Corrected to use description
  editModal.open();
});

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

const profileAvatarPopUp = new PopUpWithForm(
  "#avatar-modal",
  handleAvatarSubmit,
  profileAvatarButton,
  config
);

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopUp.open();
});
profileAvatarPopUp.setEventListeners();

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

const cardDeletePopUp = new PopUpWithConfirmation({
  popUpSelector: "#modal-delete-modal",
});

cardDeletePopUp.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  editModal.setLoading(true);
  api
    .setUserInfo(inputValues.title, inputValues.description)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      editModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.setLoading(false);
    });
}

function handleImageClick(name, link) {
  previewCardModal.open(name, link);
}

function handleEditButtonClick() {
  profileEditModal.classList.add("modal_opened");
}

if (profileEditButton) {
  profileEditButton.addEventListener("click", handleEditButtonClick);
}

const previewCardModal = new PopUpWithImage("#modal-preview");
previewCardModal.setEventListeners();

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
  const cardInstance = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard, // This now correctly passes the cardInstance to handleDeleteCard
    handleLike
  );
  return cardInstance.getView();
}

function handleAddCardSubmit(inputValues) {
  addModal.setLoading(true);
  api
    .addCard(inputValues) // Pass the entire inputValues object
    .then((data) => {
      const cardEl = renderCard(data); // Render the card using the response data
      section.addItem(cardEl);
      addModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addModal.setLoading(false);
    });
}

function handleAvatarSubmit(url) {
  profileAvatarPopUp.setLoading(true);
  api
    .updateAvatar(url)
    .then((data) => {
      userInfo.setAvatar(data);
      profileAvatarPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopUp.setLoading(false);
    });
}

function handleDeleteCard(cardInstance) {
  // CHANGED: Renamed argument to cardInstance
  cardDeletePopUp.open(); // Open the confirmation popup
  cardDeletePopUp.setSubmitAction(() => {
    cardDeletePopUp.setLoading(true, "Deleting...");
    api
      .deleteCard(cardInstance._data._id) // CHANGED: Use cardInstance to access the card's ID
      .then(() => {
        cardInstance.handleDeleteButton(); // CHANGED: Use cardInstance to call the delete method
        cardDeletePopUp.close(); // Close the confirmation popup
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopUp.setLoading(false, "Yes");
      });
  });
}

function handleLike(cardInstance) {
  if (cardInstance.isLiked) {
    api
      .dislikeCard(cardInstance.id)
      .then((data) => {
        cardInstance.setIsLiked(data.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!cardInstance.isLiked) {
    api
      .likeCard(cardInstance.id)
      .then((data) => {
        cardInstance.setIsLiked(data.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/*Delete card confirmation*/
const deleteConfirmPopup = new PopUpWithConfirmation({
  popUpSelector: "#modal-delete-modal", // Consistent naming
});
deleteConfirmPopup.setSubmitAction(() => {
  deleteConfirmPopup.setLoading(true);
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      deleteConfirmPopup.close();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      deleteConfirmPopup.setLoading(false);
    });
});

/* ------------------------------------------------------------------------------- */
