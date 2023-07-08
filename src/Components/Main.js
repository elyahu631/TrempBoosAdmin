//Comps/Main.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import PLogin from "../Pages/PLogin";
import PHome from "../Pages/PHome";
import Header from "./Header";

import PUsers from "../Pages/TrempBossManagement/PUsers";
import PGroups from "../Pages/TrempBossManagement/PGroups";
import PTremps from "../Pages/TrempBossManagement/PTremps";
import PGifts from "../Pages/TrempBossManagement/PGifts";
import PManageSystemAdmin from "../Pages/PManagingSystemAdmin";
import PReportsAndStatistics from "../Pages/TrempBossManagement/PReportsAndStatistics";
import PAddAdmin from "../Pages/PAddAdmin";
import PUpdateAdmin from "../Pages/PUpdateAdmin ";

import { Box } from "@mui/material";

const Main = () => {
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
          <Route path="/home" element={ <PHome /> } />
          <Route path="/users" element={ <PUsers /> } />
          <Route path="/groups" element={ <PGroups />} />
          <Route path="/tremps" element={<PTremps />} />
          <Route path="/gifts" element={<PGifts /> } />
          <Route path="/manage-system-admin" element={ <PManageSystemAdmin />} />
          <Route path="/add-admin" element={ <PAddAdmin />} />
          <Route path="/update-admin/:id" element={ <PUpdateAdmin />} />
          <Route path="/reports-and-statistics" element={ <PReportsAndStatistics/>} />
        </Routes>
      </Router>
      </Box>
    </div>
  );
};

export default Main;
