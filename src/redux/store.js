import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: {
    userInfo,
    success: userInfo && true,
  },
};

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
