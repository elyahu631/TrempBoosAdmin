//Comps/PLogin.jsx

import { Formik } from "formik";
import * as Yup from "yup"; //ספרייה שעובדת עם הספרייה פורמיק לצורך בדיקת נתונים מהמשתמש ותגובה בהתאם
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, useState } from "react";

//הגדרת תנאים לנתונים שאנו רוצים לקבל ומתן הודעות בהתאם
const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const PLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log(values);
    setSubmitting(false);

    try {
      const isLoginSuccessful = await login(values.username, values.password);
      if (isLoginSuccessful) {
        navigate("/home");
      } else {
        // handle failed login attempt
        console.error("Login attempt failed");
        setOpen(true); // show snackbar error
      }
    } catch (error) {
      // handle errors during the login attempt
      console.error("An error occurred during login", error);
      setOpen(true); // show snackbar error
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        background: "transparent",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          sx={{ backgroundColor: "#fc9790", color: "black" }}
        >
          <Typography variant="body1" fontWeight="bold">
            Login failed. Please check your username and password.
          </Typography>
        </Alert>
      </Snackbar>

      <Card
        variant="outlined"
        sx={{ p: 5 }}
        style={{ background: "transparent" }}
      >
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
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
                      <Typography
                        justifyContent="center"
                        variant="h6"
                        component="h6"
                      >
                        To Manage TREMP-BOSS APP
                      </Typography>
                    </Box>
                    <TextField
                      size="small"
                      label="Username"
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Enter your username"
                      error={!!errors.username && !!touched.username}
                      helperText={touched.username && errors.username}
                    />

                    <TextField
                      size="small"
                      label="Password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="form-control"
                      error={!!errors.password && !!touched.password}
                      helperText={touched.password && errors.password}
                    />

                    <Box display="flex" justifyContent="center" mt="4px">
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ fontWeight: "bold" }}
                      >
                        LOGIN
                      </Button>
                    </Box>
                  </Box>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default PLogin;
