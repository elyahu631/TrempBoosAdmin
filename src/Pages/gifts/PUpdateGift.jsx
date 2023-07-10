import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GiftContext } from "../../Contexts/GiftsContext";
import { GiftSchema } from "../../utils/validationSchema";
import GiftForm from "./GiftForm";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { GiftValues } from "../../utils/initialValues";

const PUpdateUser = () => {
  const { id } = useParams();
  const context = useContext(GiftContext);
  const gift = context.gifts.find((gift) => gift._id === id);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState(gift || GiftValues);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    // Only keep the fields that have changed
    let changes = Object.keys(values)
      .filter((key) => initialValues[key] !== values[key])
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }, {});

      changes.id = values._id;
    // Separate the photo_URL (if it exists) from the other changes
    let file;
    if (changes.hasOwnProperty("photo_URL")) {
      file = changes.gift_image;
      delete changes.gift_image;
    }

    let res = await context.updateGift(changes, file);
    if (Object.keys(changes).length === 1 && file === undefined) {
      res = "No field has been updated";
    }
    else if (res === undefined) {
      res = "Gift updated successfully";
    }
    setError(res);
    setOpen(true);
  };

  useEffect(() => {
    setInitialValues(gift || GiftValues);
  }, [gift]);

  if (!gift) return "Loading...";

  return (
    <>
      <GiftForm
        initialValues={gift}
        validationSchema={GiftSchema}
        onSubmit={handleSubmit}
        formTitle="Edit Gift"
        submitButtonTitle="update"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error !== "Gift updated successfully" || error === "No field has been updated" ? "error" : "success"}
      />
    </>
  );
};

export default PUpdateUser;
