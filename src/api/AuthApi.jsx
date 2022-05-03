import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "../reducers/types";

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
