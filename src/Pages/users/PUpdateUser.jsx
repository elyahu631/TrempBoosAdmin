import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { UpdateUserSchema } from "../../utils/validationSchema";
import UserForm from "./UserForm";
import { decode } from "base-64";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { UserValues } from "../../utils/initialValues";

const PUpdateUser = () => {
  const { id } = useParams();
  const decodedUserId = decode(id);
  const context = useContext(UserContext);
  const user = context.users.find((user) => user._id === decodedUserId);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState(user || UserValues);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    
    delete values.updatedAt;
    delete values.groups;

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
  
    // Separate the photo_URL (if it exists) from the other changes
    let file;
    if (changes.hasOwnProperty("photo_URL")) {
      file = changes.photo_URL;
      delete changes.photo_URL;
    }
    let res = "";
    if (Object.keys(changes).length === 1 && file === undefined) {
      setError("No field has been updated");
    }
    else {
      res = await context.updateUser(changes, file);
      if (!res.status) {
        setError(res.error.message);
      }
      else {
        setError("User updated successfully");
      }
    }
    setOpen(true);
  };

  useEffect(() => {
    setInitialValues(user || UserValues);
  }, [user]);

  if (!user) return "Loading...";

  return (
    <>
      <UserForm
        initialValues={user}
        validationSchema={UpdateUserSchema}
        onSubmit={handleSubmit}
        formTitle="Edit User"
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

export default PUpdateUser;
