//Comps/Main.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PLogin from "../Pages/PLogin";
import PHome from "../Pages/PHome";

const Main = () => {
  return (
    <div style={{ marginTop: 15 }}>
      <Router>
        <Routes>
          <Route path="/" element={<PLogin />} />
          <Route path="/home" element={<PHome />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
