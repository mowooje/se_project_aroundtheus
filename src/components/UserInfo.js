export default class UserInfo {
  constructor({ profileTitle, profileDescription, avatarSelector }) {
    this._title = document.querySelector(profileTitle);
    this._description = document.querySelector(profileDescription);
    this._avatar = document.querySelector(avatarSelector);
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

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
