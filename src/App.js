import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";
import FormSignup from "./components/form-signup/FormSignup.component";
import FormLogin from "./components/form-login/FormLogin.component";
import Dashboard from "./components/dashboard/Dashboard.component";
import Logout from "./components/logout/Logout.component";

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
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<FormSignup />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
