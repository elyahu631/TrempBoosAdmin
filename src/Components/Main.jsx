//Comps/Main.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

const Main = () => {
  return (
    <div>
      <Header/>
      <Router>
      <Routes>
          <Route path="/" element={<PLogin />} />
          <Route path="/home" element={<PHome />} />
          <Route path="/users" element={<PUsers />} />
          <Route path="/groups" element={<PGroups />} />
          <Route path="/tremps" element={<PTremps />} />
          <Route path="/gifts" element={<PGifts />} />
          <Route path="/manage-system-admin" element={<PManageSystemAdmin />} />
          <Route path="/add-admin" element={<PAddAdmin />} />
          <Route path="/update-admin" element={<PUpdateAdmin/>} />
          <Route path="/reports-and-statistics" element={<PReportsAndStatistics />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
