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
      "http://localhost:5500/api/adminUsers/login",
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
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user._id));
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