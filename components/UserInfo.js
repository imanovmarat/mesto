export default class UserInfo {
  constructor({ nameSelector, positionSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._positionElement = document.querySelector(positionSelector);
  }

  getUserInfo() {
    this._userInfo = {};

    this._userInfo['name'] = this._nameElement.textContent;
    this._userInfo['position'] = this._positionElement.textContent;

/*    userInfo['name'] = document.querySelector('.profile__name');
    userInfo['position'] = document.querySelector('.profile__position');*/
    // console.log(this._userInfo);
    return this._userInfo;
  }

  setUserInfo(data) {
/*    const profileName = document.querySelector('.profile__name');
    const profilePosition = document.querySelector('.profile__position');*/

    this._nameElement.textContent = data['name-input'];
    this._positionElement.textContent = data['position-input'];
  }
}
