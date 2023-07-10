import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Backdrop, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { LoginContext } from "../../Contexts/LoginContext";
import Table from '../../Components/Table';
import { encode } from 'base-64';
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../../Contexts/UserContext";
import UsersHeader from "./UsersHeader";


const PUsers = () => {
  const { users, refreshUsers, deleteUsers } = useContext(UserContext);
  const tableData = users;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { loading } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    { field: "displayId", headerName: "ID", flex: 0.2, minWidth: 50, hideable: false, align: "center", headerAlign: "center" },
    { field: "user_email", headerName: "Email", flex: 1, minWidth: 150, align: "center", headerAlign: "center" },
    { field: "first_name", headerName: "First Name", flex: 1, minWidth: 80, align: "center", headerAlign: "center" },
    { field: "last_name", headerName: "Last Name", flex: 1, minWidth: 80, align: "center", headerAlign: "center" },
    { field: "phone_number", headerName: "Phone Number", flex: 1, minWidth: 110, align: "center", headerAlign: "center" },
    { field: "status", headerName: "Status", flex: 0.5, minWidth: 80, align: "center", headerAlign: "center" },
    { field: "gender", headerName: "Gender", flex: 0.5, minWidth: 80, align: "center", headerAlign: "center" },
    { field: "coins", headerName: "Coins", flex: 0.5, minWidth: 70, align: "center", headerAlign: "center" },
    { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 150, align: "center", headerAlign: "center" },
    { field: "updatedAt", headerName: "Updated At", flex: 1, minWidth: 150, align: "center", headerAlign: "center" },
    { field: "last_login_date", headerName: "Last Login", flex: 1, minWidth: 150, align: "center", headerAlign: "center" },
    { field: "deleted", headerName: "Deleted", flex: 0.5, minWidth: 150, align: "center", headerAlign: "center" },
    {
      field: "edit",
      headerName: "Edit",
      hideable: false,
      flex: 0.2,
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
        paddingLeft: isSmallScreen ? theme.spacing(2) : 0,
        paddingRight: isSmallScreen ? theme.spacing(2) : 0,
      }}
    >
      <UsersHeader
        handleDelete={handleDelete}
        handleAddUser={handleAddUser}
        handleRefresh={handleRefresh}
      />
      <Table
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

export default PUsers;
