import { context, show, hide, toggle } from '../ui.js';
import updateUserPassword from '../logic/update-user-password.js';
import loginPage from './login-page.js';
import updateUserAvatar from '../logic/update-user-avatar.js';
import DEFAULT_AVATAR_URL from '../logic/helpers/global-variables.js';
import retrieveUser from '../logic/retrieve-user.js';

const getHomePage = () => document.querySelector('.home');

const avatarImage = getHomePage().querySelector('.home-header-avatar'),
  homeLinks = getHomePage().querySelectorAll('a'),
  profileLink = homeLinks[1],
  goHome = homeLinks[0],
  profilePanel = getHomePage().querySelector('.profile'),
  updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form'),
  updateUserPasswordForm = profilePanel.querySelector('.profile-password-form');

getHomePage().querySelector('.home-header-logout').onclick = () => {
  delete context.userId;
  avatarImage.src = DEFAULT_AVATAR_URL;

  hide(getHomePage(), profilePanel);
  show(loginPage);
};

goHome.onclick = (event) => {
  event.preventDefault();

  hide(profilePanel);
  show(getHomePage());
};

profileLink.onclick = (event) => {
  event.preventDefault();

  toggle(profilePanel);
};

updateUserAvatarForm.onsubmit = (event) => {
  event.preventDefault();

  const url = event.target.url.value;

  try {
    updateUserAvatar(context.userId, url);

    alert('avatar updated');

    avatarImage.src = url;

    updateUserAvatarForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

updateUserPasswordForm.onsubmit = (event) => {
  event.preventDefault();

  const password = event.target.password.value,
    newPassword = event.target.newPassword.value,
    newPasswordConfirm = event.target.newPasswordConfirm.value;

  try {
    updateUserPassword(
      context.userId,
      password,
      newPassword,
      newPasswordConfirm
    );

    alert('password updated');

    updateUserPasswordForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

const renderUser = (userId) => {
  try {
    const user = retrieveUser(userId);

    profileLink.innerText = user.name;
    avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL;

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export { avatarImage, profileLink, renderUser, getHomePage };
