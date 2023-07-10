import React from 'react';
import { IconButton, Button, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

const GiftsHeader = ({ handleDelete, handleAddGift, handleRefresh }) => (
  <>
    <Typography variant="h4">Gifts</Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Changed from "flex-end" to "space-between"
        width: "90%",
        marginBottom: "10px",
      }}
    >
      <IconButton color="load" onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <IconButton color="primary" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddGift}
        >
          Add Gift
        </Button>
      </Box>
    </Box>
  </>
);

export default GiftsHeader;
