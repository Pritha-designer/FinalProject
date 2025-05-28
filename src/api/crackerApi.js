import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/crackers' });

export const fetchCrackers = () => API.get('/');
export const createCracker = (cracker) => API.post('/', cracker);
export const updateCracker = (id, cracker) => API.put(`/${id}`, cracker);
export const deleteCracker = (id) => API.delete(`/${id}`);


