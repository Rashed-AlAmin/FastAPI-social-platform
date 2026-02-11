import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, password) => api.post('/register', { email, password }),
  login: (email, password) => api.post('/token', { email, password }),
};

export const postsAPI = {
  getAll: (sorting = 'new') => api.get(`/post?sorting=${sorting}`),
  getOne: (id) => api.get(`/post/${id}`),
  create: (body) => api.post('/post', { body }),
  like: (post_id) => api.post('/like', { post_id }),
};

export const commentsAPI = {
  create: (body, post_id) => api.post('/comment', { body, post_id }),
  getForPost: (post_id) => api.get(`/post/${post_id}/comment`),
};

export default api;