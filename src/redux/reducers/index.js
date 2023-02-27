import { combineReducers } from 'redux';
import { userLoginReducer } from './userReducer';
import { fetchPostsReducers, deletePostReducer, editPostReducer } from './postReducer';

export default combineReducers({
  userLogin: userLoginReducer,
  posts: fetchPostsReducers,
  deletePost: deletePostReducer,
  editedPost: editPostReducer,
});
