import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GroupContext } from "../../Contexts/GroupContext";
import { updateGroupSchema } from "../../utils/validationSchema";
import GroupForm from "./GroupForm";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { GroupValues } from "../../utils/initialValues";

const PUpdateGroup = () => {
  const { id } = useParams();
  const context = useContext(GroupContext);
  const group = context.groups.find((group) => group._id === id);
  const [initialValues, setInitialValues] = useState(group || GroupValues);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setInitialValues(group || GroupValues);
  }, [group]);

  const handleSubmit = async (values, locations) => {
    console.log("Form is submitted");
    let changes = Object.keys(values)
      .filter((key) => group[key] !== values[key])
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }, {});

    changes.id = id;
    changes.locations = locations;

    let file;
    if (changes.hasOwnProperty("image_URL")) {
      file = changes.image_URL;
      delete changes.image_URL;
    }
    delete changes.admins_ids;
    let res = await context.updateGroup(changes, file);
    if (!res.status) {
      setError(res.error.message);
    } else {
      setError("Group updated successfully");
    }
    setOpen(true);
  };

  if (!group) return "Loading...";

  return (
    <>
       <GroupForm
        initialValues={initialValues} 
        initialLocations={group.locations || []}  
        validationSchema={updateGroupSchema}
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
