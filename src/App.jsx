import { useEffect } from "react";
import Main from "./Components/Main";
import LoginProvider from "./Contexts/LoginContext";
import { AdminProvider } from "./Contexts/AdminContext ";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#226e7f89";
  }, []);

  return (
    <LoginProvider>
      <AdminProvider>
        <Main />
      </AdminProvider>
    </LoginProvider>
  );
}

export default App;
