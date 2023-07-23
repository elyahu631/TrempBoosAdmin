import { useEffect } from "react";
import Main from "./Components/Main";
import LoginProvider from "./Contexts/LoginContext";
import { AdminProvider } from "./Contexts/AdminContext";
import { UserProvider } from "./Contexts/UserContext";
import { GiftProvider } from "./Contexts/GiftsContext";
import { GroupProvider } from "./Contexts/GroupContext";
import ErrorBoundary from "./Components/ErrorBoundary ";
import { KpiProvider } from "./Contexts/KpiContext";
import { TrempProvider } from "./Contexts/TrempContext";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#ebebeb";
  }, []);

  return (
    <ErrorBoundary>
      <LoginProvider>
        <AdminProvider>
          <UserProvider>
            <TrempProvider>
              <GroupProvider>
                <GiftProvider>
                  <KpiProvider>
                    <Main />
                  </KpiProvider>
                </GiftProvider>
              </GroupProvider>
            </TrempProvider>
          </UserProvider>
        </AdminProvider>
      </LoginProvider>
    </ErrorBoundary>

  );
}

export default App;
