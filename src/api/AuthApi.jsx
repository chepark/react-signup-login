import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from "../reducers/types";
import {
  createUser,
  updateFirestoreEmail,
  updateFirestoreUserName,
} from "./UserApi";

const dispatchAction = (callback, type, payload) => {
  const action = { type, payload };
  callback(action);
};

export const signup = (values, cb) => {
  const { username, email, password } = values;

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // after create account
      // update displayName(username)
      updateProfile(auth.currentUser, {
        displayName: username,
      }).then(() => {
        // create user doc in firestore.
        createUser(user.uid, email, username);
        // dispatch the data to context.
        dispatchAction(cb, SIGNUP_SUCCESS, user);
        console.log("username updated");
      });

      // create a user doc in firestore.
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
      switch (error.code) {
        case "auth/user-not-found":
          return dispatchAction(cb, LOGIN_FAIL, "Email does not exist.");
        case "auth/wrong-password":
          return dispatchAction(cb, LOGIN_FAIL, "Password is wrong.");
        default:
          dispatchAction(cb, LOGIN_FAIL, error.code);
      }
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
      updateFirestoreUserName(auth.currentUser.uid, newUserName);
    })
    .catch((error) => {
      console.log("Error in UserProfileUpdate");
    });
};

export const updateUserEmail = async (newEmail, cb) => {
  // reauthenticate first.
  const user = auth.currentUser;
  const password = prompt("Password please.");
  const credential = EmailAuthProvider.credential(user.email, password);

  try {
    // reauthenticate is needed to change email address.
    await reauthenticateWithCredential(user, credential);
    await updateEmail(auth.currentUser, newEmail);
    await updateFirestoreEmail(auth.currentUser.uid, newEmail);
    dispatchAction(cb, UPDATE_SUCCESS, user);
    console.log("wow");
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        return dispatchAction(cb, UPDATE_FAIL, "Wrong password.");
      default:
        console.log(Error.code);
    }
  }

  // reauthenticateWithCredential(user, credential)
  //   .then(() => {
  //     console.log("it works");
  //   })
  //   .catch((error) => {
  //     console.log("not works", error);
  //   });

  // // update email.
  // updateEmail(auth.currentUser, newEmail)
  //   .then(() => {
  //     // Email updated.
  //     console.log("email updated");
  //     updateFirestoreEmail(auth.currentUser.uid, newEmail);
  //   })
  //   .catch((error) => {
  //     console.log("Error in EmailUpdate");
  //   });
};
