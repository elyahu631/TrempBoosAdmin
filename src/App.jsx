import { useEffect } from "react";
import Main from "./Components/Main";
import LoginProvider from "./Contexts/LoginContext";
import { AdminProvider } from "./Contexts/AdminContext";
import { UserProvider } from "./Contexts/UserContext";
import { GiftProvider } from "./Contexts/GiftsContext";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#ebebeb";
  }, []);

  return (
    <LoginProvider>
      <AdminProvider>
        <UserProvider>
          <GiftProvider>
        <Main />
        </GiftProvider>
        </UserProvider>
      </AdminProvider>
    </LoginProvider>
  );
}

export default App;
