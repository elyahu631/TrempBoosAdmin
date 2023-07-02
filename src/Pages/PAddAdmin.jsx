import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Grid,
  Checkbox,
  Box,
  Avatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdminContext } from "../Contexts/AdminContext ";

const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  role: "",
  phone_number: "",
  account_activated: false,
  email: "",
  photo_URL: "https://dummyurl.com/dummyimage.jpg",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  photo_URL: Yup.mixed().required("Profile picture is required"),
});

const TextInputField = ({ label, name, formik }) => {
  const { handleChange, handleBlur, values, touched, errors } = formik;

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      type="text"
      name={name}
      id={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
      placeholder={`Enter your ${label.toLowerCase()}`}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
    />
  );
};

const CheckboxInputField = ({ label, name, formik }) => {
  const { handleChange, values } = formik;

  return (
    <Box display="flex" alignItems="center">
      <Checkbox name={name} checked={values[name]} onChange={handleChange} />
      <Typography variant="body1">{label}</Typography>
    </Box>
  );
};

const FileInputField = ({ label, name, formik }) => {
  const { setFieldValue, values } = formik;

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
  };

  return (
    <>
      <input
        accept="image/*"
        id={name}
        name={name}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor={name}>
        <Button variant="outlined" component="span">
          {label}
        </Button>
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
      <Avatar
        src={
          values[name] instanceof File || values[name] instanceof Blob
            ? URL.createObjectURL(values[name])
            : values[name]
        }
        style={{ width: 70, height: 70, marginLeft: "10px" }}
      >
        {!values[name] && <PhotoCamera />}
      </Avatar>
    </>
  );
};

const PAddAdmin = () => {
  const context = useContext(AdminContext);

  const formik = useFormik({
    initialValues, // use initialValues here
    validationSchema, // use validationSchema here
    onSubmit: (values) => {
      // Use a regular object instead of FormData
      const data = {
        ...values,
        accountActivated: values.accountActivated ? true : false, // Convert checkbox boolean to integer
      };

      console.log(data);
      context.addUser(data);
    },
  });

  return (
    <Container>
      <Grid
        container
        style={{ minHeight: "80vh", maxHeight: "100vh", overflow: "auto" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ padding: "20px", background: "transparent" }}>
            <Typography variant="h4" component="h2" align="center">
              Add User Page
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                justifyContent="center"
                style={{ padding: "2px", margin: "5px 0" }}
              >
                <FileInputField
                  label="Profile Picture"
                  name="photo_URL"
                  formik={formik}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInputField
                    label="Username"
                    name="username"
                    formik={formik}
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
                <Grid item xs={12}>
                  <TextInputField
                    label="Password"
                    name="password"
                    formik={formik}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField label="Role" name="role" formik={formik} />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    label="Phone Number"
                    name="phone_number"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField label="Email" name="email" formik={formik} />
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
                    Add User
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

export default PAddAdmin;
