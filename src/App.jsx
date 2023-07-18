import { useEffect } from "react";
import Main from "./Components/Main";
import LoginProvider from "./Contexts/LoginContext";
import { AdminProvider } from "./Contexts/AdminContext";
import { UserProvider } from "./Contexts/UserContext";
import { GiftProvider } from "./Contexts/GiftsContext";
import { GroupProvider } from "./Contexts/GroupContext";
import ErrorBoundary from "./Components/ErrorBoundary ";
import { KpiProvider } from "./Contexts/KpiContext";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#ebebeb";
  }, []);

  return (
    <ErrorBoundary>
      <LoginProvider>
        <AdminProvider>
          <UserProvider>
            <GroupProvider>
              <GiftProvider> 
                <KpiProvider>          
                <Main />
                </KpiProvider> 
              </GiftProvider>
            </GroupProvider>
          </UserProvider>
        </AdminProvider>
      </LoginProvider>
    </ErrorBoundary>

  );
}

export default App;
