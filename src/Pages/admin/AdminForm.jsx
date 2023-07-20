// UserForm.jsx
import React from "react";
import { useFormik } from "formik";
import { Button, Card, Grid, Typography, Container } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { CheckboxInputField } from "../../Components/CheckboxInputField";
import { FileInputField } from "../../Components/FileInputField";
import RoleSelect from "../../Components/RoleSelect";

const AdminForm = ({
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
        style={{ minHeight: "80vh", maxHeight: "100vh", overflow: "none",marginBottom:"50px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ padding: "20px", background: "transparent" }}>
            <Typography variant="h4" component="h2" align="center">
              {formTitle}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                justifyContent="center"
                style={{ padding: "2px", margin: "5px 0" }}
              >
                <FileInputField
                  label="Profile Picture"
                  name="image_URL"
                  formik={formik}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RoleSelect
                    label="Role"
                    name="role"
                    value={formik.values.role || "helpdesk"}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.role && formik.errors.role)}
                    options={[
                      { value: 'helpdesk', label: 'Help Desk' },
                      { value: 'admin', label: 'Admin' },
                    ]}
                  />
                </Grid>
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
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Phone Number"
                    name="phone_number"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField label="Email" name="email" formik={formik} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Username"
                    name="username"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Password"
                    name="password"
                    formik={formik}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CheckboxInputField
                    label="Account Activated"
                    name="account_activated"
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

export default AdminForm;
