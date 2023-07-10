import React from "react";
import { useFormik } from "formik";
import { Button, Card, Grid, Typography, Container, Box } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { FileInputField } from "../../Components/FileInputField";

const GiftForm  = ({
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

  return (
    <Container maxWidth="md">
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
              <Box sx={{ padding: "8px", marginY: "5px" }}>
                <FileInputField
                  label="Gift Image"
                  name="gift_image"
                  formik={formik}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInputField
                    label="Gift Name"
                    name="gift_name"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Price"
                    name="price"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Quantity"
                    name="quantity"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Collect Place"
                    name="collect_place"
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

export default GiftForm;
