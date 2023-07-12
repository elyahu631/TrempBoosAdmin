// PAddGroup.jsx
import React, { useContext, useState } from "react";
import { GroupContext } from "../../Contexts/GroupContext";
import { GroupValues } from "../../utils/initialValues";
import { GroupSchema } from "../../utils/validationSchema";
import GroupForm from "./GroupForm";
import CustomSnackbar from "../../Components/CustomSnackbar";

const PAddGroup = () => {
  const context = useContext(GroupContext);
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
  
    // Destructure location values and create a new group object
    const { location_name, latitude, longitude, ...groupData } = values;
  
    const data = {
      ...groupData,
      locations: [{
        name: location_name,
        coordinates: { latitude, longitude }
      }],
    };
  
    console.log(data);
  
    let res = await context.addGroup(data);
    console.log(res);
  
    if (res === undefined) {
      res = "Group created"
    }
    setError(res);
    setOpen(true);
  };
  

  return (
    <>
      <GroupForm
        initialValues={GroupValues}
        validationSchema={GroupSchema}
        onSubmit={handleSubmit}
        formTitle="Add Group"
        submitButtonTitle="Add Group"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error === "Group created" ? "success" : "error"}
      />
    </>
  );
};

export default PAddGroup;
