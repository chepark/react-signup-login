import { collection, getDocs } from "firebase/firestore/lite";
import { doc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const usersRef = collection(db, "users");

const createUser = async (uid, email, username) => {
  await setDoc(doc(usersRef, uid), {
    email: email,
    username: username,
  });
};

const getUserByEmail = async (uid, email) => {
  const userDocRef = doc(db, "users");
  const q = query(userDocRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log("getUserByEmail", doc);
  });
};
