import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  EDIT_POST_RESET,
} from '../constant';

export const fetchPostsReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { loading: true, success: false };
    case FETCH_POSTS_SUCCESS:
      return { loading: false, success: true, thePosts: action.payload };
    case FETCH_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true, success: false };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true, delete: action.payload };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const editPostReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return { loading: true, success: false };
    case EDIT_POST_SUCCESS:
      return { loading: false, success: true, thePost: action.payload };
    case EDIT_POST_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_POST_RESET:
      return {};
    default:
      return state;
  }
};
