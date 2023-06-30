// Pages/PManageSystemAdmin.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  IconButton,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

const fetchUsers = async () => {
  return [
    {
      id: 1,
      username: "admin2",
      email: "admin2@gmail.com",
      first_name: "מנהל",
      last_name: "מערכת",
      role: "admin",
      phone_number: "058-555-9874",
      account_activated: true,
    },
    {
      id: 2,
      username: "admin2",
      email: "admin2@gmail.com",
      first_name: "מנהל",
      last_name: "מערכת",
      role: "admin",
      phone_number: "058-555-9874",
      account_activated: true,
    },
  ];
};

const PManageSystemAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  const handleAddUser = () => {
    navigate("/add-admin");
  };

  const handleDelete = () => {
    console.log(selectedUsers);
    if (selectedUsers.length > 0) {
      alert(`Deleting ${selectedUsers.length} user(s)`);
      setSelectedUsers([]);
    } else {
      alert("No users selected");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "phone_number", headerName: "Phone Number", flex: 1 },
    { field: "account_activated", headerName: "Account Activated", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleEditUser(params.row.id)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const handleEditUser = (userId) => {
    navigate(`/update-admin`);
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4">System Administrators</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "90%",
          marginBottom: "10px",
        }}
      >
        <IconButton color="primary" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>
      <Box
        sx={{
          height: 400,
          width: isSmallScreen ? "100%" : "90%",
          marginBottom: "20px",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          checkboxSelection
          onRowClick={(params) => {
            console.log("row= "+ params.row);
          }}
          onRowSelectionModelChange={(newSelection) => {
            const selected = newSelection.map((id) => {
              const user = users.find((user) => user.id === parseInt(id));
              return user;
            });
            setSelectedUsers(selected);
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          autoHeight
          disableExtendRowFullWidth
        />
      </Box>
    </Box>
  );
};

export default PManageSystemAdmin;
