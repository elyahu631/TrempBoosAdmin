import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GroupContext } from "../../Contexts/GroupContext";
import { GroupSchema } from "../../utils/validationSchema";
import GroupForm from "./GroupForm";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { GroupValues } from "../../utils/initialValues";

const PUpdateGroup = () => {
  const { id } = useParams();
  const context = useContext(GroupContext);
  const group = context.groups.find((group) => group._id === id);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState(group || GroupValues);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    let changes = Object.keys(values)
      .filter((key) => initialValues[key] !== values[key])
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }, {});

    changes.id = id;

    let file;
    if (changes.hasOwnProperty("image_URL")) {
      file = changes.image_URL;
      delete changes.image_URL;
    }

    let res = "";
    if (Object.keys(changes).length === 1 && file === undefined) {
      setError("No field has been updated");
    }
    else {
      console.log(file);
      res = await context.updateGroup(changes, file);
      if (!res.status) {
        setError(res.error.message);
      }
      else {
        setError("Group updated successfully");
      }
    }
    setOpen(true);
  };

  useEffect(() => {
    setInitialValues(group || GroupValues);
  }, [group]);

  if (!group) return "Loading...";

  return (
    <>
      <GroupForm
        initialValues={group}
        validationSchema={GroupSchema}
        onSubmit={handleSubmit}
        formTitle="Edit Group"
        submitButtonTitle="update"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error !== "Group updated successfully" || error === "No field has been updated" ? "error" : "success"}
      />
    </>
  );
};

export default PUpdateGroup;
