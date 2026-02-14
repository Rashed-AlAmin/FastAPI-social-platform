import axios from 'axios';

const API_URL =  import.meta.env.VITE_API_URL || 'https://fastapi-social-platform.onrender.com';

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
  register: (email, username, password) => 
    api.post('/register', { email, username, password }),
  login: (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    return api.post('/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
};

export const postsAPI = {
  getAll: (sorting = 'new') => api.get(`/post?sorting=${sorting}`),
  getOne: (id) => api.get(`/post/${id}`),
  create: (body) => api.post('/post', { body }),
  like: (post_id) => api.post('/like', { post_id }),
  delete: (post_id) => api.delete(`/post/${post_id}`),
  update: (post_id, body) => api.put(`/post/${post_id}`, { body }),
  getUserPosts: (user_id) => api.get(`/user/${user_id}/posts`),
};

export const commentsAPI = {
  create: (body, post_id) => api.post('/comment', { body, post_id }),
  getForPost: (post_id) => api.get(`/post/${post_id}/comment`),
};

export default api;