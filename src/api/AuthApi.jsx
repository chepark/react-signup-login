import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../reducers/types";

const dispatchAction = (callback, type, payload) => {
  const action = { type, payload };
  callback(action);
};

export const signup = (email, password, cb) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed-up successfully", user);
      dispatchAction(cb, SIGNUP_SUCCESS, user);
    })
    .catch((error) => {
      console.log("Error in signup", error.message);
      dispatchAction(cb, SIGNUP_FAIL, error);
    });
};

export const signupWithFacebook = (cb) => {
  const provider = new FacebookAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      dispatchAction(cb, SIGNUP_SUCCESS, user);
      console.log("facebook signup", user);
    })
    .catch((error) => {
      const credential = FacebookAuthProvider.credentialFromError(error);
      dispatchAction(cb, SIGNUP_FAIL, error);
      console.log("facebook error", error);
    });
};

export const signupWithGoogle = (cb) => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      dispatchAction(cb, SIGNUP_SUCCESS, user);
      console.log("google signup", user);
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      dispatchAction(cb, SIGNUP_FAIL, error);
    });
};

export const login = (email, password, cb) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatchAction(cb, LOGIN_SUCCESS, user);
    })
    .catch((error) => {
      dispatchAction(cb, LOGIN_FAIL, error);
    });
};

export const logout = (cb) => {
  signOut(auth)
    .then(() => {
      dispatchAction(cb, LOGOUT_SUCCESS);
    })
    .catch((error) => {
      dispatchAction(cb, LOGOUT_FAIL, error);
    });
};
