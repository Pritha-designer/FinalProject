import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/users' });

export const signup = (userData) => API.post('/signup', userData);
export const login = (credentials) => API.post('/login', credentials);