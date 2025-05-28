
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/orders' });

export const placeOrder = (order) => API.post('/', order);
export const fetchOrders = () => API.get('/');

// export const placeOrder = (orderData) => {
//   return axios.post('http://localhost:5000/api/orders', orderData);  
// }
