// GroupForm.jsx
import React from "react";
import { useFormik } from "formik";
import { Button, Card, Grid, Typography, Container } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { FileInputField } from "../../Components/FileInputField";
import MainSelect from "../../Components/Select";
import { NumberInputField } from "../../Components/NumberInputField";

const GroupForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  formTitle,
  submitButtonTitle,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Options for the Type select field
  const typeOptions = [
    { value: "CITIES", label: "Cities" },
    { value: "PRIVATE", label: "Private" },
  ];

  return (
    <Container>
      <Grid container sx={{ minHeight: "80vh", maxHeight: "100vh", overflow: "none", marginBottom: "50px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ padding: "20px", background: "transparent" }}>
            <Typography variant="h4" component="h2" align="center">
              {formTitle}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container justifyContent="center" sx={{ padding: "8px", margin: "5px 0" }}>
                <FileInputField
                  label="Group Image"
                  name="group_image"
                  formik={formik}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInputField
                    label="Group Name"
                    name="group_name"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MainSelect
                    label="Type"
                    name="type"
                    value={formik.values.type || "CITIES"}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    options={typeOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Location Name"
                    name="location_name"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumberInputField
                    label="Latitude"
                    name="latitude"
                    min={-90}
                    max={90}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumberInputField
                    label="Longitude"
                    name="longitude"
                    min={-180}
                    max={180}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {submitButtonTitle}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupForm;
