import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";

const authInitialState = {
  user: null,
  signupError: "",
  loading: false,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, user: action.payload };
    case SIGNUP_FAIL:
      return { ...state, signupError: action.payload };
    default:
      return authInitialState;
  }
};

export { authInitialState, AuthReducer };
