import React from 'react';
import { IconButton, Box, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const TrempsHeader = ({ handleRefresh }) => (
  <>
    <Typography variant="h4">Tremps</Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", 
        width: "90%",
        marginBottom: "10px",
      }}
    >
      <IconButton color="load" onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
    </Box>
  </>
);

export default TrempsHeader;
