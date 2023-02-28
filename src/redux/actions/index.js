import axios from 'axios';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
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
    const { data } = await publicApi.get('/?_limit=20');
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

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });
    const { data } = await publicApi.delete(`/${id}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const editPost = (id, title, body) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_POST_REQUEST });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    const { data } = await publicApi.patch(`/${id}`, formData);
    dispatch({
      type: EDIT_POST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: EDIT_POST_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
