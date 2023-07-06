import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomSnackbar = ({ open, handleClose, message, severity = "error" }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {typeof message === "string" ? message : JSON.stringify(message)}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
