import React from "react";
import { useFormik } from "formik";
import { Button, Card, Grid, Typography, Container } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { FileInputField } from "../../Components/FileInputField";
import GenderSelect from "../../Components/GenderSelect";

const UserForm = ({
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
    <Container>
      <Grid
        container
        style={{ minHeight: "80vh", maxHeight: "100vh", overflow: "none", marginBottom:"50px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ padding: "20px", background: "transparent" }}>
            <Typography variant="h4" component="h2" align="center">
              {formTitle}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container justifyContent="center" style={{ padding: "8px", margin: "5px 0" }}>
                <FileInputField
                  label="Profile Picture"
                  name="photo_URL"
                  formik={formik}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="First Name"
                    name="first_name"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Last Name"
                    name="last_name"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Phone Number"
                    name="phone_number"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField label="Email" name="user_email" formik={formik} />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Password"
                    name="password"
                    formik={formik}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <GenderSelect
                    label="Gender"
                    name="gender"
                    value={formik.values.gender || "M"}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.gender && formik.errors.gender)}
                    options={[
                      { value: 'M', label: 'Male' },
                      { value: 'F', label: 'Female' },
                      { value: 'O', label: 'Other' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <GenderSelect
                    label="Status"
                    name="status"
                    value={formik.values.status || "active"}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.status && formik.errors.status)}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
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

export default UserForm;
