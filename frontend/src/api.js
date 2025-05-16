import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (username, password) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getMenu = () => {
  return axios.get(`${API_URL}/menu`);
};

export const createOrder = (token, userId, items) => {
  return axios.post(
    `${API_URL}/order/create`,
    { userId, items },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getOrderStatus = (token, orderId) => {
  return axios.get(`${API_URL}/order/status/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
