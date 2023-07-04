import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../Contexts/AdminContext";
import { UpdateAdminSchema } from "../utils/validationSchema";
import UserForm from "../Components/admin/UserForm";
import { decode } from "base-64";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PUpdateAdmin = () => {
  const { id } = useParams();
  const decodedUserId = decode(id);
  const context = useContext(AdminContext);
  const user = context.adminUsers.find((user) => user.id === decodedUserId);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState(user || {});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    delete values.updatedAt;
    // Only keep the fields that have changed
    const changes = Object.keys(values)
      .filter((key) => initialValues[key] !== values[key])
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }, {});

    // Include id in changes but don't allow it to be modified
    changes.id = decodedUserId;
    
    //If accountActivated field was updated
    if (changes.hasOwnProperty("account_activated")) {
      changes.account_activated = changes.account_activated ? true : false;
    }
    // Separate the photo_URL (if it exists) from the other changes
    let file;
    if (changes.hasOwnProperty("photo_URL")) {
      file = changes.photo_URL;
      delete changes.photo_URL;
    }
    delete changes.id;
    let res = await context.updateUser(changes, file);
    if(Object.keys(changes).length === 0){
      res = "No field has been updated";
    }
    else if (res === undefined) {
      res = "User updated successfully";
    }
    setError(res);
    setOpen(true);
  };

  useEffect(() => {
    setInitialValues(user || {});
  }, [user]);

  if (!user) return "Loading...";

  return (
    <>
      <UserForm
        initialValues={user}
        validationSchema={UpdateAdminSchema}
        onSubmit={handleSubmit}
        formTitle="Edit Admin"
        submitButtonTitle="update"
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {typeof error === "string" ? error : JSON.stringify(error)}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PUpdateAdmin;
