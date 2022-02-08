import { ACCESS_TOKEN_KEY } from '../../constants'
import { AUTH_LOGOUT, AUTH_SET_ACCOUNT_PROFILE, AUTH_SET_LOGGED_IN } from '../types'

const initialState = { isLoggedIn: false, user: null };

export const setLoggedIn = loggedIn => ({
  type: AUTH_SET_LOGGED_IN,
  payload: loggedIn,
});

export const setAccountProfile = accountProfile => ({
  type: AUTH_SET_ACCOUNT_PROFILE,
  payload: accountProfile,
});

export const authLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  return {
    type: AUTH_LOGOUT,
    payload: null,
  };
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      };
    case AUTH_SET_ACCOUNT_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}