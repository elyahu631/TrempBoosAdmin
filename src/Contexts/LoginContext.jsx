import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext({
  token: null
});
const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  const login = (username, password) => {
    return fetch(
      "https://trempboss-nodeserver.up.railway.app/api/adminUsers/login",
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
        setLoading(false); 
        return true;
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        return false;
      });
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // remove event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <LoginContext.Provider value={{ user, token, login, logout, isLoggedIn: !!user, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
