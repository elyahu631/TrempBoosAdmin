import { useEffect } from "react";
import Main from "./Components/Main";
import LoginProvider from "./Contexts/LoginContext";
import { AdminProvider } from "./Contexts/AdminContext";
import { UserProvider } from "./Contexts/UserContext";
import { GroupProvider } from "./Contexts/GroupContext";
import ErrorBoundary from "./Components/ErrorBoundary";
import { KpiProvider } from "./Contexts/KpiContext";
import { TrempProvider } from "./Contexts/TrempContext";
import { GroupReqProvider } from "./Contexts/GroupReqContext";
import { BrowserRouter as Router} from "react-router-dom";

function CombinedProvider({ children }) {
  return (
    <LoginProvider>
      <AdminProvider>
        <UserProvider>
          <TrempProvider>
            <GroupReqProvider>
              <GroupProvider>
                <KpiProvider>
                  {children}
                </KpiProvider>
              </GroupProvider>
            </GroupReqProvider>
          </TrempProvider>
        </UserProvider>
      </AdminProvider>
    </LoginProvider>
  );
}

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#ebebeb";
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <CombinedProvider>
          <Main />
        </CombinedProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
