import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const AdminTable = ({ rows, columns,tableData, setSelectedUsers }) => {
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
            const user = tableData.find((user) => user.id === id);
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
