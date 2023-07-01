import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
        console.log("====================================");
        console.log(data.user);
        console.log(data.token);
        console.log("====================================");
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return true;
      })
      .catch((error) => {
        console.error(error);
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
    <LoginContext.Provider value={{ user, token, login, logout, isLoggedIn: !!user }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
