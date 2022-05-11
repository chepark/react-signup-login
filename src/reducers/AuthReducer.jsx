import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from "./types";

const authInitialState = {
  user: null,
  signupError: "",
  loginError: "",
  logoutError: "",
  updateError: "",
  loading: false,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, user: action.payload };
    case SIGNUP_FAIL:
      return { ...state, signupError: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case LOGIN_FAIL:
      return { ...state, loginError: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, user: null };
    case LOGOUT_FAIL:
      return { ...state, logoutError: action.payload };
    case UPDATE_SUCCESS:
      return { ...state, user: action.payload };
    case UPDATE_FAIL:
      return { ...state, updateError: action.payload };
    default:
      return authInitialState;
  }
};

export { authInitialState, AuthReducer };
