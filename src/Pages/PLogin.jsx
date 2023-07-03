// Comps/PLogin.jsx

import { Formik } from "formik";
import { Box, Button, Card, Container, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, useState } from "react";
import {TextInputField} from '../Components/TextInputField';
import { LoginSchema } from "../utils/validationSchema";
import { LoginValues } from '../utils/initialValues';

const PLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(false);
    try {
      const isLoginSuccessful = await login(values.username, values.password);
      if (isLoginSuccessful) {
        navigate("/home");
      } else {
        console.error("Login attempt failed");
        setOpen(true);
      }
    } catch (error) {
      console.error("An error occurred during login", error);
      setOpen(true);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "transparent",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ backgroundColor: "#fc9790", color: "black" }}>
          <Typography variant="body1" fontWeight="bold">
            Login failed. Please check your username and password.
          </Typography>
        </Alert>
      </Snackbar>

      <Card variant="outlined" sx={{ p: 5 }} style={{ background: "transparent" }}>
        <Formik
          validationSchema={LoginSchema}
          initialValues={LoginValues}
          onSubmit={handleFormSubmit}
        >
          {(formik) => (
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box display="grid" gap={3} mt={1}>
                <Box display="grid" gap={1}>
                  <Typography
                    display="flex"
                    justifyContent="center"
                    variant="h4"
                    component="h2"
                    textAlign="center"
                  >
                    Login
                  </Typography>
                  <Typography justifyContent="center" variant="h6" component="h6">
                    To Manage TREMP-BOSS APP
                  </Typography>
                </Box>
                <TextInputField
                  label="Username"
                  name="username"
                  formik={formik}
                />
                <TextInputField
                  label="Password"
                  name="password"
                  formik={formik}
                  type="password"
                />
                <Box display="flex" justifyContent="center" mt="4px">
                  <Button type="submit" variant="contained" size="large" sx={{ fontWeight: "bold" }}>
                    LOGIN
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default PLogin;
