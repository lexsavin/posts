import { BASE_URL, COUNT_POSTS_PER_PAGE } from "./constants";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  signUp(authorizationData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(authorizationData),
    }).then(onResponce);
  }

  signIn(authorizationData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(authorizationData),
    }).then(onResponce);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  setUserInfo(dataUser, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  setUserAvatar(dataAvatar, token) {
    return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataAvatar),
    }).then(onResponce);
  }

  getPostsList(pagePagination, token) {
    return fetch(
      `${this._baseUrl}/v2/group-10/posts/paginate?page=${pagePagination}&limit=${COUNT_POSTS_PER_PAGE}&query=`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    ).then(onResponce);
  }

  getPostById(postId, token) {
    return fetch(`${this._baseUrl}/v2/group-10/posts/${postId}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  changeLikePost(postId, isLike, token) {
    return fetch(`${this._baseUrl}/v2/group-10/posts/likes/${postId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  createPost(dataPost, token) {
    return fetch(`${this._baseUrl}/v2/group-10/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataPost),
    }).then(onResponce);
  }

  editPostById(postId, dataPost, token) {
    return fetch(`${this._baseUrl}/v2/group-10/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataPost),
    }).then(onResponce);
  }

  deletePostById(postId, token) {
    return fetch(`${this._baseUrl}/v2/group-10/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }
}

export const api = new Api(BASE_URL);
