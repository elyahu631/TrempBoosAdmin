import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const MainTable = ({ rows, columns,tableData, setSelectedData ,showCheckBox = true}) => {
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
        checkboxSelection={showCheckBox}
        key={0}
        density='standard'
        rows={rows}
        columns={columns}
        pageSize={10}
        pageSizeOptions={[20,30,100]}
        showCellVerticalBorder
        showColumnVerticalBorder
        onRowSelectionModelChange={(newSelection) => {
          const selected = newSelection.map((id) => {
            console.log(tableData);
            const data = tableData.find((data) => data.id === id);
            return data;
          });
          if (showCheckBox){
            setSelectedData(selected);
          }
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default MainTable;
