//Comps/Main.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';

import PLogin from "../Pages/PLogin";
import PHome from "../Pages/PHome";
import Header from "./Header";
import PUsers from "../Pages/users/PUsers";
import PAddUser from "../Pages/users/PAddUser";
import PUpdateUser from "../Pages/users/PUpdateUser";
import PGroups from "../Pages/groups/PGroups";
import PGroupReq from "../Pages/groupRequest/PGroupReq";
import PAddGroup from "../Pages/groups/PAddGroup";
import PUpdateGroup from "../Pages/groups/PUpdateGroup";
import PTremps from "../Pages/tremps/PTremps";
import PManageSystemAdmin from "../Pages/admin/PManagingSystemAdmin";
import PKpi from "../Pages/kpis/PKpi";
import PAddAdmin from "../Pages/admin/PAddAdmin";
import PUpdateAdmin from "../Pages/admin/PUpdateAdmin ";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <div>
    </div>
  );
};

const Main = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div>
        <Box>
          <Header />
        </Box>
        <Box marginTop={13}>
          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<PHome />} />
              <Route path="/users" element={<PUsers />} />
              <Route path="/add-user" element={<PAddUser />} />
              <Route path="/update-user/:id" element={<PUpdateUser />} />
              <Route path="/group-request" element={<PGroupReq/>} />
              <Route path="/groups" element={<PGroups />} />
              <Route path="/add-group" element={<PAddGroup />} />
              <Route path="/update-group/:id" element={<PUpdateGroup />} />
              <Route path="/tremps" element={<PTremps />} />
              <Route path="/manage-system-admin" element={<PManageSystemAdmin />} />
              <Route path="/add-admin" element={<PAddAdmin />} />
              <Route path="/update-admin/:id" element={<PUpdateAdmin />} />
              <Route path="/reports-and-statistics" element={<PKpi />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<PLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Box>
    </div>
  );
};

export default Main;
