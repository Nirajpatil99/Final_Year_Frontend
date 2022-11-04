import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { Provider } = AuthContext;

  const [authState, setAuthState] = useState({
    username: "",
    authenticated: false,
  });

  const isUserAuthenticated = () => authState.authenticated;

  return (
    <Provider value={{ authState, setAuthState, isUserAuthenticated }}>
      {children}
    </Provider>
  );
};

module.exports = { AuthContext, AuthProvider };
