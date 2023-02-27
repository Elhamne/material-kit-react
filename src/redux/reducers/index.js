import { combineReducers } from 'redux';
import { userLoginReducer } from './userReducer';
import { fetchPostsReducers } from './postReducer';

export default combineReducers({
  userLogin: userLoginReducer,
  posts: fetchPostsReducers,
});
