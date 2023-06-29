import { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Array of existing users
  const users = [
    { id: '1', username: 'user1', password: 'password1' },
    { id: '2', username: 'user2', password: 'password2' },
    // add more users here
  ];

  const login = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setUser({ id: user.id, username: user.username });
    } else {
      // handle failed login attempt
      console.error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;