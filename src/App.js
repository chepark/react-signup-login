import { useEffect, useContext } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";
import FormSignup from "./components/form-signup/FormSignup.component";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // add setUser
      } else {
        //user is signed out
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="App">
      <FormSignup />
    </div>
  );
}

export default App;
