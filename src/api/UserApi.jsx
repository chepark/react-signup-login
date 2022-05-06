import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const usersRef = collection(db, "users");

export const createUser = async (uid, email, username) => {
  await setDoc(doc(usersRef, uid), {
    email: email,
    username: username,
  });
};

export const getUserByEmail = async (email) => {
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log("getUserByEmail", doc.data());
  });
};
