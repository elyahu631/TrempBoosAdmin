import React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AdminTable = ({ adminUsers, handleEditUser, setSelectedUsers }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const rows = adminUsers.map((user, index) => ({
    ...user, 
    id: user._id,
    displayId: index + 1
  }));
  
  const columns = [
    { field: "displayId", headerName: "ID", flex: 0.2 },
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

  return (
    <Box
      sx={{
        height: 400,
        width: isSmallScreen ? "100%" : "90%",
        marginBottom: "20px",
      }}
    >
      <DataGrid
        density='compact'
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowClick={(params) => {
          console.log("row= " + params.row);
        }}
        onRowSelectionModelChange={(newSelection) => {
          const selected = newSelection.map((id) => {
            console.log("selectedUsers", setSelectedUsers);
            const user = adminUsers.find((user) => user.id === id);
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
  );
};

export default AdminTable;
