import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Backdrop, IconButton } from "@mui/material";
import { AdminContext } from "../../Contexts/AdminContext";
import { LoginContext } from "../../Contexts/LoginContext";
import SystemAdminsHeader from './SystemAdminsHeader';
import AdminTable from '../../Components/Table';
import { encode } from 'base-64';
import EditIcon from "@mui/icons-material/Edit";


const PManageSystemAdmin = () => {
  const { adminUsers, deleteUsers ,refreshAdmins} = useContext(AdminContext);
  const tableData = adminUsers;
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

  const rows = adminUsers.map((user, index) => ({
    ...user, 
    id: user._id,
    displayId: index + 1,
    account_activated:user.account_activated? "yes":"no",
    deleted:user.deleted? "yes":"no"
  }));

  const columns = [
    { field: "displayId", headerName: "ID", flex: 0.2 ,hideable: false},
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "phone_number", headerName: "Phone Number", flex: 1 },
    { field: "account_activated", headerName: "Account Activated", flex: 1 },
    { field: "deleted", headerName: "Deleted", flex: 0.5},
    {
      field: "edit",
      headerName: "Edit",
      hideable: false,
      flex: 0.2,
      renderCell: (params) => (
        <IconButton
          color="edit"
          onClick={() => handleEditUser(params.row.id)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];



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
        rows={rows}
        columns={columns}
        tableData={tableData}
        setSelectedUsers={setSelectedUsers}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default PManageSystemAdmin;
