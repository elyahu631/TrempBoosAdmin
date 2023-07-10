import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../Contexts/AdminContext";
import { UpdateAdminSchema } from "../../utils/validationSchema";
import AdminForm from "./AdminForm";
import { decode } from "base-64";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { AdminValues } from "../../utils/initialValues";

const PUpdateAdmin = () => {
  const { id } = useParams();
  const decodedUserId = decode(id);
  const context = useContext(AdminContext);
  const user = context.adminUsers.find((user) => user._id === decodedUserId);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState(user || AdminValues);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    console.log(values);
    delete values.updatedAt;
    // Only keep the fields that have changed
    let changes = Object.keys(values)
      .filter((key) => initialValues[key] !== values[key])
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }, {});

    // Include id in changes but don't allow it to be modified
    changes.id = decodedUserId;
    console.log(changes);
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
    let res = await context.updateUser(changes, file);
    console.log(file)
    console.log(res)
    if (Object.keys(changes).length === 1 && file === undefined) {
      res = "No field has been updated";
    }
    else if (res === undefined) {
      res = "User updated successfully";
    }
    setError(res);
    setOpen(true);
  };

  useEffect(() => {
    setInitialValues(user || AdminValues);
  }, [user]);

  if (!user) return "Loading...";

  return (
    <>
      <AdminForm
        initialValues={user}
        validationSchema={UpdateAdminSchema}
        onSubmit={handleSubmit}
        formTitle="Edit Admin"
        submitButtonTitle="update"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error !== "User updated successfully" || error === "No field has been updated" ? "error" : "success"}
      />
    </>
  );
};

export default PUpdateAdmin;
