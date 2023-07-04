// PAddAdmin.jsx
import React, { useContext, useState } from "react";
import { AdminContext } from "../Contexts/AdminContext";
import { AdminValues } from "../utils/initialValues";
import { AddAdminSchema } from "../utils/validationSchema";
import UserForm from "../Components/admin/UserForm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PAddAdmin = () => {
  const context = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    const data = {
      ...values,
      account_activated: values.account_activated ? true : false,
      photo_URL: values.photo_URL,
    };
    console.log(data.account_activated);
    let res = await context.addUser(data);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    if (res === undefined){
        res = "system user created"
    }
    setError(res);
    setOpen(true);
  };

  return (
    <>
      <UserForm
        initialValues={AdminValues}
        validationSchema={AddAdminSchema}
        onSubmit={handleSubmit}
        formTitle="Add Admin"
        submitButtonTitle="Add Admin"
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} sx={{ width: "100%" }}>
          {typeof error === "string" ? error : JSON.stringify(error)}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PAddAdmin;
