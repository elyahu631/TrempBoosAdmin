import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const Table = ({ rows, columns,tableData, setSelectedData }) => {
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
            console.log(tableData);
            const data = tableData.find((data) => data.id === id);
            return data;
          });
          setSelectedData(selected);
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default Table;
