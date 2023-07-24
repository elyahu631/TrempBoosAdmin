import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext({
  token: null
});
const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (tokenFromStorage && userFromStorage) {
      setUser(userFromStorage);
      setToken(tokenFromStorage);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    return fetch(
      "https://tremp-boss-api.cyclic.app/api/adminUsers/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }

        return response.json();
      })
      .then((data) => {
        let dataReceived = data.data;
        setUser(dataReceived.user);
        setToken(dataReceived.token);
        localStorage.setItem("token", dataReceived.token);
        localStorage.setItem("user", JSON.stringify(dataReceived.user._id));
        setLoading(false); 
        return true;
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        return false;
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <LoginContext.Provider value={{ user, token, login, logout, isLoggedIn: !!user, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;