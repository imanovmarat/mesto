export default class UserInfo {
  constructor({ nameSelector, positionSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._positionElement = document.querySelector(positionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {};

    this._userInfo['name'] = this._nameElement.textContent;
    this._userInfo['position'] = this._positionElement.textContent;

    return this._userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data['name-input'];
    this._avatarElement.alt = data['name-input'];
    this._positionElement.textContent = data['position-input'];
  }

  setAvatar(link) {
    this._avatarElement.src = link;
  }
}
