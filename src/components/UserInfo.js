export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._title = document.querySelector(
      ".profile__title .profile__description"
    );
    this._description = document.querySelector(".profile__description");
  }

  getUserInfo() {
    this._userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
  }
}
