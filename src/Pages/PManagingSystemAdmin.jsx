import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { AdminContext } from "../Contexts/AdminContext";
import { LoginContext } from "../Contexts/LoginContext";
import SystemAdminsHeader from '../Components/admin/SystemAdminsHeader';
import AdminTable from '../Components/admin/AdminTable';
import { encode } from 'base-64';

const PManageSystemAdmin = () => {
  const { adminUsers, deleteUsers ,refreshAdmins} = useContext(AdminContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const { loading } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAddUser = () => {
    navigate("/add-admin");
  };

  const handleDelete = () => {
    console.log(selectedUsers);
    if (selectedUsers.length > 0) {
      deleteUsers(selectedUsers.map((user) => user.id));
      setSelectedUsers([]);
    } else {
      alert("No users selected");// fix it 
    }
  };

  const handleEditUser = (userId) => {
    console.log('====================================');
    console.log(userId);
    console.log('====================================');
    const encodedUserId = encode(userId);
    navigate(`/update-admin/${encodedUserId}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshAdmins();
    setIsRefreshing(false);
  }

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
        handleRefresh={handleRefresh}
      />
      <AdminTable
        adminUsers={adminUsers}
        handleEditUser={handleEditUser}
        setSelectedUsers={setSelectedUsers}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default PManageSystemAdmin;
