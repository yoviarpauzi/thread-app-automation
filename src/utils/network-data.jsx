const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const headers = {
  'Content-Type': 'application/json',
};

const putAccessToken = (accessToken) =>
  localStorage.setItem('accessToken', accessToken);

const getAccessToken = () => localStorage.getItem('accessToken');

const removeAccessToken = () => localStorage.clear();

const register = async (userCredential) => {
  return await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userCredential),
  }).then((response) => response.json());
};

const login = async (userCredential) => {
  return await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userCredential),
  }).then((response) => response.json());
};

const getAllUsers = async () => {
  return await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const getProfile = async () => {
  return await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  }).then((response) => response.json());
};

const createThread = async (thread) => {
  return await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(thread),
  }).then((response) => response.json());
};

const getAllThread = async () => {
  return await fetch(`${BASE_URL}/threads`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const getThread = async (threadId) => {
  return await fetch(`${BASE_URL}/threads/${threadId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const createComment = async (threadId, comment) => {
  return await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(comment),
  }).then((response) => response.json());
};

const upVoteThread = async (threadId) => {
  return await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  }).then((response) => response.json());
};

const downVoteThread = async (threadId) => {
  return await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  }).then((response) => response.json());
};

const neutralizeVoteThread = async (threadId) => {
  return await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  }).then((response) => response.json());
};

const upVoteComment = async (threadId, commentId) => {
  return await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      },
  ).then((response) => response.json());
};
const downVoteComment = async (threadId, commentId) => {
  return await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      },
  ).then((response) => response.json());
};

const neutralizeVoteComment = async (threadId, commentId) => {
  return await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      },
  ).then((response) => response.json());
};

const getLeaderboard = async () => {
  return await fetch(`${BASE_URL}/leaderboards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

export {
  putAccessToken,
  getAccessToken,
  removeAccessToken,
  register,
  login,
  getAllUsers,
  getProfile,
  createThread,
  getAllThread,
  getThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
  getLeaderboard,
};
