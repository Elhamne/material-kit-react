import { FETCH_POSTS_REQUEST, FETCH_POSTS_FAIL, FETCH_POSTS_SUCCESS } from '../constant';

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
