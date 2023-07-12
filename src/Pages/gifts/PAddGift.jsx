// PAddGift.jsx
import React, { useContext, useState } from "react";
import { GiftContext } from "../../Contexts/GiftsContext";
import { GiftValues } from "../../utils/initialValues";
import { GiftSchema } from "../../utils/validationSchema";
import GiftForm from "./GiftForm";
import CustomSnackbar from "../../Components/CustomSnackbar";

const PAddGift= () => {
  const context = useContext(GiftContext);
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
      gift_image: values.gift_image,
    };
    console.log(data);
    let res = await context.addGift(data);
    console.log(res);

    if (res === undefined) {
      res = "system user created"
    }
    setError(res);
    setOpen(true);
  };


  return (
    <>
      <GiftForm
        initialValues={GiftValues}
        validationSchema={GiftSchema}
        onSubmit={handleSubmit}
        formTitle="Add Gift"
        submitButtonTitle="Add Gift"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error === "system user created" ? "success" : "error"}
      />
    </>
  );
};

export default PAddGift;
