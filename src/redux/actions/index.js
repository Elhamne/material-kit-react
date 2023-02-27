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
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
  } else {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: { message: 'Authentication failed' },
    });
  }
};

export const logout = () => async (dispatch) => {};
