import axios from 'axios';
// import { useCookies } from 'react-cookie';

// const [cookies, removeCookie] = useCookies(['token', 'user']);
// export let token  = cookies.token;
// export let userData  = cookies.user ? JSON.parse(cookies.user) : null;


// Define the base URL of your backend API
const baseURL = 'http://localhost:4000/api'; // Update this URL with your actual backend URL

// Create an instance of Axios with the base URL
const InternalApi = axios.create({
  baseURL,
  timeout: 50000,
  withCredentials: true, // Enable credentials (cookies) for cross-origin requests
});

// Authentication functions
export const signup = async (name, email, password) => {
  try {
    const response = await InternalApi.post('/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await InternalApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await InternalApi.post('/logout'); // You need to define a logout route on your server
  } catch (error) {
    throw error.response.data;
  }
};


// Other InternalApi functions for your application
export const getAllItemsInWatchlist = async () => {
  try {
    const response = await InternalApi.get('/user/Mywatchlist');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addItemToWatchlist = async (itemData) => {
  try {
    const response = await InternalApi.post('/user/watchlist/add', itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeItemFromWatchlist = async (itemData) => {
  try {
    const response = await InternalApi.post('/user/watchlist/remove', itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default InternalApi;
