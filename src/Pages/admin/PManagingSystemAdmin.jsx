import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Backdrop, IconButton } from "@mui/material";
import { AdminContext } from "../../Contexts/AdminContext";
import { LoginContext } from "../../Contexts/LoginContext";
import SystemAdminsHeader from './SystemAdminsHeader';
import MainTable from '../../Components/MainTable';
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
    account_activated:user.account_activated? "V":"X",
    deleted:user.deleted? "yes":"no"
  }));

  const columns = [
    { field: "displayId", headerName: "ID", flex: 0.2, hideable: false, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "username", headerName: "Username", flex: 1, minWidth: 100, align: "center", headerAlign: "center" },
    { field: "email", headerName: "Email", flex: 1.2, minWidth: 150, align: "center", headerAlign: "center" },
    { field: "first_name", headerName: "First Name", flex: 1, minWidth: 100, align: "center", headerAlign: "center" },
    { field: "last_name", headerName: "Last Name", flex: 1, minWidth: 100, align: "center", headerAlign: "center" },
    { field: "role", headerName: "Role", flex: 0.5, minWidth: 100, align: "center", headerAlign: "center" },
    { field: "phone_number", headerName: "Phone Number", flex: 1, minWidth: 110, align: "center", headerAlign: "center" },
    { field: "account_activated", headerName: "Activated", flex: 0.5, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "last_login_date", headerName: "last login date", flex: 1, minWidth: 100, align: "center", headerAlign: "center" },
    {
      field: "edit",
      headerName: "Edit",
      hideable: false,
      flex: 0.2,
      minWidth: 50,
      renderCell: (params) => (
        <IconButton
          color="edit"
          onClick={() => handleEditUser(params.row.id)}
          style={{ textAlign: "center" }} // Apply center alignment to the cell
        >
          <EditIcon />
        </IconButton>
      ),
      headerAlign: "center", // Align the header cell to the center
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
      <MainTable
        rows={rows}
        columns={columns}
        tableData={tableData}
        setSelectedData={setSelectedUsers}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default PManageSystemAdmin;
