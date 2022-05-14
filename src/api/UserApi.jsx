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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

export const imageDirectory = {
  temporary: "tempImage",
  profile: "profileImage",
};

export const getProfilePhotoURL = async (uid, directory, newImage) => {
  try {
    const fileRef = ref(storage, directory + "/" + uid + ".png");
    await uploadBytes(fileRef, newImage);
    const newPhotoURL = await getDownloadURL(fileRef);

    return newPhotoURL;
  } catch (error) {
    console.log("Error with photoURL in storage: ", error.message);
  }
};

export const deleteProfilePhoto = async (directory, uid) => {
  const photoRef = ref(storage, directory + "/" + uid + ".png");

  try {
    await deleteObject(photoRef);
    console.log("Deleted photo");
  } catch (error) {
    console.log("Error in deleting photoURL: ", error.code);
  }
};

export const updateFirestorePhotoURL = async (uid, newPhotoURL) => {
  const docRef = doc(db, "users", uid);

  await updateDoc(docRef, {
    photoURL: newPhotoURL,
  });
};
