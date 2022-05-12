import { FirebaseError } from "firebase/app";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase.config";
import { ref, uploadBytes } from "firebase/storage";

const usersRef = collection(db, "users");

export const createUser = async (uid, email, username) => {
  await setDoc(doc(usersRef, uid), {
    email: email,
    username: username,
  });
};

export const getUserByEmail = async (email, setErrors) => {
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      setErrors({ exist: "Email is already taken." });
      return;
    }
  });
};

export const updateFirestoreUserName = async (uid, newUserName) => {
  const docRef = doc(db, "users", uid);

  await updateDoc(docRef, {
    username: newUserName,
  });
};

export const updateFirestoreEmail = async (uid, newEmail) => {
  const docRef = doc(db, "users", uid);

  await updateDoc(docRef, {
    email: newEmail,
  });
};

export const uploadProfileImageToStorage = async (uid, newImage) => {
  const fileRef = ref(storage, uid + ".png");

  const snapshot = await uploadBytes(fileRef, newImage);
  console.log("image snapshot", snapshot);
};
