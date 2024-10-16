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
  editModal.open();
});

const { description, title } = userInfo.getUserInfo();
profileTitleInput.value = title;
profileDescriptionInput.value = description;

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

const profileAvatarPopUp = new PopUpWithForm(
  "#avatar-modal",
  handleAvatarSubmit,
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
  popUpSelector: "#delete-modal",
});

cardDeletePopUp.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  editModal.setLoading(true);
  api
    .updateUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo({
        title: data.name,
        description: data.about,
      });
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
    handleDeleteCard,
    handleLike
  );
  return cardInstance.getView();
}

function handleAddCardSubmit(inputValues) {
  addModal.setLoading(true);
  const cardData = {
    name: inputValues.name.trim(),
    link: inputValues.link.trim(),
  };

  if (!cardData.name || !cardData.link) {
    console.error("Name and link are required fields.");
    addModal.setLoading(false);
    return;
  }

  api
    .addCard(cardData)
    .then((data) => {
      const cardEl = renderCard(data);
      section.addItem(cardEl);
      addModal.resetForm();
      addCardFormValidator.disableButton();
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
      avatarFormValidator.disableButton();
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
  cardDeletePopUp.open();
  cardDeletePopUp.setSubmitAction(() => {
    cardDeletePopUp.setLoading(true, "Deleting...");
    api
      .deleteCard(cardInstance.id)
      .then(() => {
        cardInstance.handleDeleteButton();
        cardDeletePopUp.close();
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
        cardInstance.setIsLiked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardInstance.id)
      .then((data) => {
        cardInstance.setIsLiked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
