import axios from 'axios';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
} from '../constant';

const publicApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

const USER = {
  id: 1,
  email: 'abc@email.com',
  password: '123456',
};

export const login = (email, password) => async (dispatch) => {
  if (email === USER.email && password === USER.password) {
    const data = { id: USER.id, email: USER.email };
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 'Authentication failed',
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('userInfo');
};

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_POSTS_REQUEST });
    const { data } = await publicApi.get();
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_POSTS_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
