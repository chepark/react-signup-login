import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../reducers/types";
import { createUser } from "./UserApi";

const dispatchAction = (callback, type, payload) => {
  const action = { type, payload };
  callback(action);
};

export const signup = (values, cb) => {
  const { username, email, password } = values;
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatchAction(cb, SIGNUP_SUCCESS, user);
      // create a user doc in firestore.
      createUser(user.uid, email, username);
    })
    .catch((error) => {
      dispatchAction(cb, SIGNUP_FAIL, error);
    });
};

export const signupWithFacebook = (cb) => {
  const provider = new FacebookAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const { uid, email, displayName } = user;
      createUser(uid, email, displayName);

      dispatchAction(cb, SIGNUP_SUCCESS, user);
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
      const user = result.user;
      const { uid, email, displayName } = user;
      createUser(uid, email, displayName);
      dispatchAction(cb, SIGNUP_SUCCESS, user);
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

export const updateUserProfile = (newUserName) => {
  updateProfile(auth.currentUser, {
    displayName: newUserName,
  })
    .then(() => {
      // profile updated
      console.log("username updated");
    })
    .catch((error) => {
      console.log("Error in UserProfileUpdate");
    });
};

export const updateUserEmail = (newEmail) => {
  updateEmail(auth.currentUser, newEmail)
    .then(() => {
      // Email updated.
      console.log("email updated");
    })
    .catch((error) => {
      console.log("Error in EmailUpdate");
    });
};
