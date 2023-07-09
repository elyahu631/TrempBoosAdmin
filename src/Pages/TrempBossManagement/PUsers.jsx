import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Backdrop, IconButton } from "@mui/material";
import { LoginContext } from "../../Contexts/LoginContext";
import AdminTable from '../../Components/Table';
import { encode } from 'base-64';
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../../Contexts/UserContext";
import UsersHeader from "../../Components/users/UsersHeader";


const PManageSystemAdmin = () => {
  const { users ,refreshUsers,deleteUsers} = useContext(UserContext);
  const tableData = users;
  const [selectedUsers, setSelectedUsers] = useState([]);  
  const { loading } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAddUser = () => {
    navigate("/add-user");
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
    navigate(`/update-user/${encodedUserId}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshUsers();
    setIsRefreshing(false);
  }

  const rows = users.map((user, index) => ({
    ...user, 
    id: user._id,
    displayId: index + 1,
  }));

  const columns = [
    { field: "displayId", headerName: "ID", flex: 0.2, hideable: false },
    { field: "user_email", headerName: "Email", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "phone_number", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.5 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    { field: "coins", headerName: "Coins", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    { field: "last_login_date", headerName: "Last Login", flex: 1 },
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
      <UsersHeader
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
