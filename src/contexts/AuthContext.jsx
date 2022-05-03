import { createContext, useReducer, useContext } from "react";
import { authInitialState, AuthReducer } from "../reducers/AuthReducer";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, authInitialState);
  const value = { state, dispatch };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuth };
