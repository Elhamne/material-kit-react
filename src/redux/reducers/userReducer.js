export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true, success: false };
    case 'USER_LOGIN_SUCCESS':
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};
