import React from 'react';
import { IconButton, Button, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const SystemAdminsHeader = ({ handleDelete, handleAddUser }) => (
  <>
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
  </>
);

export default SystemAdminsHeader;
