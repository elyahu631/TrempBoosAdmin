import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AdminTable = ({ adminUsers, handleEditUser, setSelectedUsers }) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));


  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    // Clean up after the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "90%",
        height: viewportHeight * 0.65, // 80% of the viewport height
      }}
    >
      <DataGrid
        key={0}
        density='compact'
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          const selected = newSelection.map((id) => {
            const user = adminUsers.find((user) => user.id === id);
            return user;
          });
          setSelectedUsers(selected);
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default AdminTable;
