//Comps/Main.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';

import PLogin from "../Pages/PLogin";
import PHome from "../Pages/PHome";
import Header from "./Header";
import PUsers from "../Pages/users/PUsers";
import PAddUser from "../Pages/users/PAddUser";
import PUpdateUser from "../Pages/users/PUpdateUser";
import PGroups from "../Pages/groups/PGroups";
import PTremps from "../Pages/tremps/PTremps";
import PGifts from "../Pages/gifts/PGifts";
import PManageSystemAdmin from "../Pages/admin/PManagingSystemAdmin";
import PReportsAndStatistics from "../Pages/TrempBossManagement/PReportsAndStatistics";
import PAddAdmin from "../Pages/admin/PAddAdmin";
import PUpdateAdmin from "../Pages/admin/PUpdateAdmin ";

import { Box } from "@mui/material";

const Main = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div>
      <Router>
        <Box>
          <Header />
        </Box>
        <Box marginTop={13}>
          {isLoggedIn ? (
            <Routes>
              <Route path="/home" element={ <PHome /> } />
              <Route path="/users" element={ <PUsers /> } />
              <Route path="/add-user" element={ <PAddUser /> } />
              <Route path="/update-user/:id" element={ <PUpdateUser/> } />
              <Route path="/groups" element={ <PGroups />} />
              <Route path="/tremps" element={<PTremps />} />
              <Route path="/gifts" element={<PGifts /> } />
              <Route path="/manage-system-admin" element={ <PManageSystemAdmin />} />
              <Route path="/add-admin" element={ <PAddAdmin />} />
              <Route path="/update-admin/:id" element={ <PUpdateAdmin />} />
              <Route path="/reports-and-statistics" element={ <PReportsAndStatistics/>} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<PLogin />} />
            </Routes>
          )}
        </Box>
      </Router>
    </div>
  );
};

export default Main;
