//Comps/Main.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import PLogin from "../Pages/PLogin";
import PHome from "../Pages/PHome";
import Header from "./Header";

import PUsers from "../Pages/TrempBossManagement/PUsers";
import PGroups from "../Pages/TrempBossManagement/PGroups";
import PTremps from "../Pages/TrempBossManagement/PTremps";
import PGifts from "../Pages/TrempBossManagement/PGifts";
import PManageSystemAdmin from "../Pages/PManagingSystemAdministrators";
import PReportsAndStatistics from "../Pages/TrempBossManagement/PReportsAndStatistics";
import PAddAdmin from "../Pages/PAddAdmin";
import PUpdateAdmin from "../Pages/PUpdateAdmin ";
import { useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import { Box } from "@mui/material";

const Main = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      <Box ref={headerRef} position="fixed" top={0} left={0} right={0} zIndex="tooltip">
        <Header />
      </Box>
      <Box marginTop={headerHeight/4}>
      <Router>
        <Routes>
          <Route path="/" element={<PLogin />} />
          <Route path="/home" element={isLoggedIn ? <PHome /> : <Navigate to="/" />} />
          <Route path="/users" element={isLoggedIn ? <PUsers /> : <Navigate to="/" />} />
          <Route path="/groups" element={isLoggedIn ? <PGroups /> : <Navigate to="/" />} />
          <Route path="/tremps" element={isLoggedIn ? <PTremps /> : <Navigate to="/" />} />
          <Route path="/gifts" element={isLoggedIn ? <PGifts /> : <Navigate to="/" />} />
          <Route path="/manage-system-admin" element={isLoggedIn ? <PManageSystemAdmin /> : <Navigate to="/" />} />
          <Route path="/add-admin" element={isLoggedIn ? <PAddAdmin /> : <Navigate to="/" />} />
          <Route path="/update-admin" element={isLoggedIn ? <PUpdateAdmin /> : <Navigate to="/" />} />
          <Route path="/reports-and-statistics" element={isLoggedIn ? <PReportsAndStatistics /> : <Navigate to="/" />} />
        </Routes>
      </Router>
      </Box>
    </div>
  );
};

export default Main;
