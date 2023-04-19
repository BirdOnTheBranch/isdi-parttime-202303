import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';
import { show, hide } from '../ui.js';
import updatePost from '../logic/update-post.js';
import retrieveAvatar from '../logic/retrive-avatar.js';
import handleLikes from '../logic/like-posts.js';
import retrieveUser from '../logic/retrieve-user.js';
import getHomePage from '../components/get-home-page.js';

const homePage = getHomePage(),
  postListPanel = homePage.querySelector('.post-list'),
  editPostPanel = homePage.querySelector('.edit-post'),
  editPostForm = editPostPanel.querySelector('form');

editPostForm.onsubmit = (event) => {
  event.preventDefault();

  const postId = event.target.postId.value,
    image = event.target.image.value,
    text = event.target.text.value;

  try {
    updatePost(context.userId, postId, image, text);

    hide(editPostPanel);

    renderPosts();
  } catch (error) {
    alert(error.message);
  }
};

editPostForm.querySelector('.cancel').onclick = (event) => {
  event.preventDefault();

  editPostForm.reset();

  hide(editPostPanel);
};

const renderPostHeader = (post) => {
  const postHeader = document.createElement('div');
  postHeader.classList.add('post-header');

  const avatarAuthor = retrieveAvatar(post.author);

  const author = document.createElement('p');
  author.classList.add('post-author');
  author.innerText = post.authorName;

  const avatar = document.createElement('img');
  avatar.classList.add('post-avatar');
  avatar.src = avatarAuthor;

  if (post.author === context.userId) {
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button-edit');
    buttonEdit.innerText = 'Edit';

    buttonEdit.onclick = () => {
      editPostForm.querySelector('input[type=hidden]').value = post.id;
      editPostForm.querySelector('input[type=url]').value = post.image;
      editPostForm.querySelector('textarea').value = post.text;

      show(editPostPanel);
    };

    postHeader.append(avatar, author, buttonEdit);
  } else {
    postHeader.append(avatar, author);
  }

  return postHeader;
};

const renderPostImage = (post) => {
  const image = document.createElement('img');
  image.classList.add('post-image');
  image.src = post.image;

  return image;
};

const renderPostText = (post) => {
  const text = document.createElement('p');
  text.classList.add('post-text');
  text.innerText = post.text;

  return text;
};

const renderPostLikesInfo = (post, user, handleLikes) => {
  const postLikesInfo = document.createElement('div');
  postLikesInfo.classList.add('post-likes-info');

  const buttonLike = document.createElement('button');
  const heartIcon = document.createElement('i');
  heartIcon.classList.add('far', 'fa-heart');
  buttonLike.classList.add('button-like');

  buttonLike.appendChild(heartIcon);

  if (post.likesUsers.includes(user.name)) {
    heartIcon.classList.add('fas');
  }

  buttonLike.onclick = () => {
    const postLikes = handleLikes(post.id, context.userId);
    const heartIcon = buttonLike.querySelector('.fa-heart');
    heartIcon.classList.toggle('fas');
    likesCount.innerText = postLikes.likesUsers.length;
    likesUsers.innerText = postLikes.likesUsers;
  };

  const likesUsers = document.createElement('p');
  likesUsers.classList.add('likes-users');
  likesUsers.innerText = post.likesUsers;

  const likesCount = document.createElement('p');
  likesCount.classList.add('likes-count');
  likesCount.innerText = post.likesCount;

  postLikesInfo.append(buttonLike, likesCount, likesUsers);

  return postLikesInfo;
};

const renderPostItem = (post, user, handleLikes) => {
  const postItem = document.createElement('article');
  postItem.classList.add('posts-users');

  const postHeader = renderPostHeader(post);
  const postImage = renderPostImage(post);
  const postText = renderPostText(post);
  const postLikesInfo = renderPostLikesInfo(post, user, handleLikes);

  postItem.append(postHeader, postImage, postLikesInfo, postText);

  return postItem;
};

const renderPosts = () => {
  try {
    const posts = retrievePosts(context.userId),
      user = retrieveUser(context.userId);

    postListPanel.innerHTML = '';

    posts.forEach((post) => {
      const postItem = renderPostItem(post, user, handleLikes);

      const date = document.createElement('time');
      date.innerText = post.date.toLocaleString('en-ES');
      postItem.append(date);

      postListPanel.append(postItem);
    });

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export default renderPosts;