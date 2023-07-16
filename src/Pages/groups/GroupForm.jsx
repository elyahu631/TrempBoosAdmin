// GroupForm.js
import React from "react";
import { Formik, Form } from "formik";
import { Button, Card, Grid, Typography, Container } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { FileInputField } from "../../Components/FileInputField";
import MainSelect from "../../Components/Select";
import MapComponent from "./MapComponent";

const GroupForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  formTitle,
  submitButtonTitle,
}) => {
  const typeOptions = [
    { value: "CITIES", label: "Cities" },
    { value: "PRIVATE", label: "Private" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Container>
          <Grid container sx={{ minHeight: "80vh", maxHeight: "100vh", overflow: "none", marginBottom: "50px" }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={10} md={5}>
              <Card sx={{ padding: "20px", background: "transparent" }}>
                <Typography variant="h4" component="h2" align="center">
                  {formTitle}
                </Typography>
                <Form>
                  <Grid container justifyContent="center" sx={{ padding: "8px", margin: "5px 0" }}>
                    <FileInputField
                      label="Group Image"
                      name="image_URL"
                      formik={formik}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ padding: "8px 0", margin: "5px 0" }}>
                    <MainSelect
                      label="Active"
                      name="active"
                      value={formik.values.active || "active"}
                      onChange={formik.handleChange}
                      error={Boolean(formik.touched.active && formik.errors.active)}
                      options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
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
                      <Typography variant="h5" align="center" sx={{ textDecoration: 'underline' }}>
                        Location
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MapComponent
                        setLocation={(loc) => formik.setFieldValue('location', loc)}
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
                </Form>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </Formik>
  );
};

export default GroupForm;
