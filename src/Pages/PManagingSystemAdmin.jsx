import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { AdminContext } from "../Contexts/AdminContext";
import { LoginContext } from "../Contexts/LoginContext";
import SystemAdminsHeader from '../Components/admin/SystemAdminsHeader';
import AdminTable from '../Components/admin/AdminTable';

const PManageSystemAdmin = () => {
  const { adminUsers, deleteUsers } = useContext(AdminContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { loading } = useContext(LoginContext);

  const navigate = useNavigate();


  const handleAddUser = () => {
    navigate("/add-admin");
  };

  const handleDelete = () => {
    console.log(selectedUsers);
    if (selectedUsers.length > 0) {
      deleteUsers(selectedUsers.map((user) => user.id));
      setSelectedUsers([]);
    } else {
      alert("No users selected");
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/update-admin/${userId}`);
  };
  
  return loading ? (
    <p>Loading...</p>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <SystemAdminsHeader
        handleDelete={handleDelete}
        handleAddUser={handleAddUser}
      />
      <AdminTable
        adminUsers={adminUsers}
        handleEditUser={handleEditUser}
        setSelectedUsers={setSelectedUsers}
      />
    </Box>
  );
};

export default PManageSystemAdmin;
